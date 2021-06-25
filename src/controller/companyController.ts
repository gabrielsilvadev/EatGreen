
import { Request, Response } from "express";
import Company from "../models/company";
import TransporteEmail from '../middleware/mailer'
import jwt from 'jsonwebtoken'
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import Adress from "../models/adress"
import Order from "../models/order";
import crypto from 'crypto';

import Yup from "yup";

export default {
  async createCompany(request: Request, response: Response) {
    const repositoryCompany = getRepository(Company)
    const repositoryAdress = getRepository(Adress)

    const adress = {
      adress: request.body.adress,
      cep: request.body.cep,
      complement: request.body.complement,
      city: request.body.city,
      states: request.body.states,
    }
    const saveAdress = repositoryAdress.create(adress)
    await repositoryAdress.save(saveAdress)

    const createObjectProduct = {
      name: request.body.name,
      cnpj: request.body.cnpj,
      password: request.body.password,
      email: request.body.email,
      telephone: request.body.telephone,
      adress: saveAdress

    }

    const saveCompany = repositoryCompany.create(createObjectProduct)

    const token = jwt.sign({ id: saveCompany.id }, '647431b5ca55b04fdf3c2fce31ef1915', {
      expiresIn: 86400
    })
    try {
      await repositoryCompany.save(saveCompany)

      return response.status(200).json({ company: saveCompany, token: token })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async updateCompany(response: Response, request: Request) {
    const idCompany = request.params.id;
    const repositoryCompany = getRepository(Company)
    try {
      await repositoryCompany.update(idCompany, request.body)
      return response.status(200).json({ message: "atualizado com sucesso" })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async authCompany(request: Request, response: Response) {
    const { email, password, conected } = request.body
    const getRepositoryCompany = getRepository(Company)
   
    try {
      const findCompany = await getRepositoryCompany.findOneOrFail({email: email})
      if (!findCompany) {
        return response.status(404).send({ err: 'Company or User not exists' })
      }
     
      if (await bcrypt.compare(password, findCompany.password)) {
        return response.status(400).send({ err: 'Invalid password' })
      }
      const token = jwt.sign({ id: findCompany.id }, '647431b5ca55b04fdf3c2fce31ef1915', {
        expiresIn: conected ? 1892160000000 : 86400
      })
      return response.status(200).json({ user: findCompany, token: token })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },

  async validationCompany(request: Request, response: Response) {
    return response.send({ ok: true, user: request.params.idCompany })
  },

  async forgot(request: Request, response: Response) {
    const { email } = request.body
    const getRepositoryCompany = getRepository(Company)
    try {
      const findCompany = await getRepositoryCompany.findOne({ email: email })
      if (!findCompany)
        return response.status(400).send({ error: 'Company or User not found' })

      const token = await crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)
      await getRepositoryCompany.update(findCompany.id, {
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
    const getRepositoryCompany = getRepository(Company)
    const company = await getRepositoryCompany.findOne({ email: email })

    try {
      if (!company)
        return response.status(400).send({ error: 'Company or User not found' })
      if (token !== company.passwordResetToken)
        return response.status(400).send({ error: 'Token invalid' })
      const now = new Date()

      if (now > company.passwordResetExpire)
        return response.status(400).send({ error: 'Token expired' })
      company.password = await bcrypt.hash(password, 10)
      await getRepositoryCompany.save(company)
      return response.send()

    } catch (err) {
      response.status(400).send({ error: 'Cannot reset password' })
    }
  },
  async getOrders(request: Request, response: Response) {
    const idCompany = request.params.id
    const getRepositoryOrder = getRepository(Order)
    try {

      const OrderByUsers = await getRepositoryOrder.find({where: {company: idCompany}})

      return response.status(200).json({ order: [OrderByUsers] })
    } catch (err) {
      return response.status(500).json({ err: err })
    }
  },



}