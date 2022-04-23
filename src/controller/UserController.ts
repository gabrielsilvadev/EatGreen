import { Request, Response } from "express"
import { getRepository } from 'typeorm'
import User from '../models/user'
import Adress from "../models/adress"
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import Yup from "yup";
import TransporteEmail from '../middleware/mailer'
import jwt from 'jsonwebtoken'

import Order from "../models/order";
import OrderProduct from "../models/product_orders"
import Company from "../models/company"
export default class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getRepository(User)
    const password = request.body.password
    const hash = await bcrypt.hash(password, 10)

    const date = {
      name: request.body.name,
      sobrename: request.body.sobrename,
      email: request.body.email,
      telephone: request.body.telephone,
      cpf: request.body.cpf,
      password: hash
    }
    const saveUser = userRepository.create(date)
    try {
      /* const schema = Yup.object().shape({
         name: Yup.string().required(),
         sobrename: Yup.string().required(),
         email: Yup.string().required(),
         telephone: Yup.number().required().max(11),
         cpf: Yup.number().required().max(11),
         password: Yup.string().required(),
       })
       await schema.validate(saveUser, {
         abortEarly: false,
       })*/
      await userRepository.save(saveUser)
      const token = jwt.sign({ id: saveUser.id }, '647431b5ca55b04fdf3c2fce31ef1915', {
        expiresIn: 86400
      })
      return response.status(201).json({ user: saveUser, token: token })
    } catch (err) {
      return response.status(406).json({ err: err })
    }
  },

  async createOrderByuser(request: Request, response: Response) {

    const repositoryOrder = getRepository(Order)
    const repositoryOrderProduct = getRepository(OrderProduct)
    const repositoryCompany = getRepository(Company)
    const getRepositoryUser = getRepository(User)
    const user = await getRepositoryUser.findOneOrFail(request.params.id, { relations: ['adress'] })
    const company = await repositoryCompany.findOneOrFail(request.body.id_company)
    const order = {
      orderStatus: request.body.orderStatus,
      formOfPayment: request.body.formOfPayment,
      priceTotal: request.body.priceTotal,
      createdAt: new Date(),
      company: company,
      user: user
    }
    const saveOrder = repositoryOrder.create(order)
    const createOrder = await repositoryOrder.save(saveOrder)

    for (let ProductOrder of request.body.products) {
      let orderProduct = {
        quantityProductsOrdered: ProductOrder.quanty,
        order: createOrder,
        priceUnitary: ProductOrder.priceUnitary,
        product: ProductOrder.id
      }
      try {
        const saveOrderProduct = repositoryOrderProduct.create(orderProduct)
        await repositoryOrderProduct.save(saveOrderProduct)
        response.status(201).json(saveOrderProduct)
      } catch (err) {
        response.status(500).json({ message: err })
      }
    }

  },

  async createAdress(request: Request, response: Response) {

    const id: string = request.params.id
    const userRepository = getRepository(User)
    const adressRepository = getRepository(Adress)
    const findUser = await userRepository.findOneOrFail(id, { relations: ['adress'] })
    const adress = {
      adress: request.body.adress,
      cep: request.body.cep,
      complement: request.body.complement,
      city: request.body.city,
      states: request.body.states,
      user: findUser
    }

    const saveAdress = adressRepository.create(adress)

    const schema = Yup.object().shape({
      adress: Yup.string().required(),
      cep: Yup.string().required(),
      complement: Yup.string().optional(),
      city: Yup.string().required(),
      states: Yup.string().required(),
      user: Yup.object().shape({
        name: Yup.string().required(),
        sobrename: Yup.string().required(),
        email: Yup.string().required(),
        telephone: Yup.number().required().max(11),
        cpf: Yup.number().required().max(11),
        password: Yup.string().required()
      }),
    })
    await schema.validate(saveAdress, {
      abortEarly: false,
    })

    await adressRepository.save(saveAdress)
    return response.status(201).json(adress)

  },

  async upgradeOrderStatus(request: Request, response: Response) {
    const idOrder = request.params.id
    const status = request.params.status
    const getOrderRepository = getRepository(Order)

    try {

      const OrderByUser = await getOrderRepository.update(idOrder, { orderStatus: status })

      return response.status(200).json({ order: [OrderByUser] })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async deleteOrder(request: Request, response: Response) {
    const idOrder = request.params.id
    const getOrderRepository = getRepository(Order)
    try {
      const OrderByUser = await getOrderRepository.findOneOrFail(idOrder)
      await getOrderRepository.delete(OrderByUser.id)
      return response.status(200).json(OrderByUser)
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async getOrder(request: Request, response: Response) {
    const idUser = request.params.id
    const getUserRepository = getRepository(User)
    const getCompanyByOrder = getRepository(Order)
    try {
      const order = await getUserRepository.findOneOrFail(idUser, { relations: ['order'] })
      const company = await getCompanyByOrder.findOneOrFail(order.order[0].id, { relations: ['company'] })
      console.log(order)
      return response.status(200).json({ order: order.order, company })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },
  async updateUser(request: Request, response: Response) {
    const idUser = request.params.id
    const getUserRepository = getRepository(User)

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      sobrename: Yup.string().required(),
      email: Yup.string().required(),
      telephone: Yup.number().required().max(11),
      cpf: Yup.number().required().max(11),
      password: Yup.string().required(),
    })
    await schema.validate(request.body, {
      abortEarly: false,
    })
    try {
      const UpdateByUser = await getUserRepository.update(idUser, request.body)
      return response.status(200).json(UpdateByUser)
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },
  async updateAdress(request: Request, response: Response) {
    const idAdress = request.params.id
    const getAdress = getRepository(Adress)

    try {
      const UpdateByUser = await getAdress.findOneOrFail(idAdress)

      await getAdress.update(idAdress, request.body)
      return response.status(200).json(UpdateByUser)
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },
  async deleteAdress(request: Request, response: Response) {
    const idAdress = request.params.id
    const getAdress = getRepository(Adress)
    try {
      const deleteAdressByUser = await getAdress.findOneOrFail(idAdress)
      await getAdress.delete(idAdress)
      return response.status(200).json(deleteAdressByUser)
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async authUser(request: Request, response: Response) {
    const { email, password, conected } = request.body
    const getRepositoryUser = getRepository(User)

    try {
      const findUser = await getRepositoryUser.findOneOrFail({ email: email })
      console.log(findUser)
      if (!findUser) {
        return response.status(404).send({ err: 'User not exists' })
      }

      if (!await bcrypt.compare(password, findUser.password)) {
        return response.status(400).send({ err: 'Invalid password' })
      }
      const token = jwt.sign({ id: findUser.id }, '647431b5ca55b04fdf3c2fce31ef1915', {
        expiresIn: conected ? 1892160000000 : 86400
      })
      return response.status(200).json({ user: findUser, token: token })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async validationUser(request: Request, response: Response) {
    return response.send({ ok: true, user: request.params.idUser })
  },

  async forgot(request: Request, response: Response) {
    const { email } = request.body
    const getRepositoryUser = getRepository(User)
    try {
      const findUser = await getRepositoryUser.findOne({ email: email })
      if (!findUser)
        return response.status(400).send({ error: 'User not found' })

      const token = await crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)
      await getRepositoryUser.update(findUser.id, {
        passwordResetToken: token,
        passwordResetExpire: now
      })


      const sendEmail = await TransporteEmail.transporte(email, token)
      return response.status(200).json({ sucess: 'token enviado' })
    } catch (err) {
      return response.status(500).json({ err: err })
    }

  },

  async resetPassword(request: Request, response: Response) {
    const { email, token, password } = request.body;
    const getRepositoryUser = getRepository(User)
    const user = await getRepositoryUser.findOne({ email: email })

    try {
      if (!user)
        return response.status(400).send({ error: 'User not found' })
      if (token !== user.passwordResetToken)
        return response.status(400).send({ error: 'Token invalid' })
      const now = new Date()

      if (now > user.passwordResetExpire)
        return response.status(400).send({ error: 'Token expired' })
      user.password = await bcrypt.hash(password, 10)
      await getRepositoryUser.save(user)
      return response.send()

    } catch (err) {
      response.status(400).send({ error: 'Cannot reset password' })
    }
  }



}
