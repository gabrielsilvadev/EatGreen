import { hash } from "bcryptjs"
import { EntityRepository, Repository } from "typeorm"
import User from "../entities/User"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import TransporteEmail from '../middleware/mailer'
import { UserInterface } from "../base-interfaces/user.interface"

@EntityRepository(User)
class UserRepository extends Repository<User>{
  async createAndSave(user: UserInterface) {
    const passwordHash = await hash(user.password, 10)
    user.password = passwordHash
    const newUser = this.create(user)
    await this.save(newUser)
    return user
  }

  async resetPassword(email: string, token: string, password: string) {
    const user = await this.findOneByEmail(email)

    if (token !== user.passwordResetToken)
      throw new Error('Token invalid')

    const now = new Date()

    if (now > user.passwordResetExpire)
      throw new Error('Token expired')
    user.password = await hash(password, 10)
    await this.save(user)
    return user

  }

  async forgot(email: string) {
    const findUser = await this.findOneByEmail(email)
    const token = await crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 1)
    await this.update(findUser.id, {
      passwordResetToken: token,
      passwordResetExpire: now
    })

    await TransporteEmail.transporte(email, token)
    return { sucess: 'token enviado' }
  }
  async updateUser(user: UserInterface, id: string) {
    const UpdateByUser = await this.update(id, user)
    return UpdateByUser

  }
  async findOneByEmail(email: string) {
    const user = await this.findOne({ where: { email } })
    if (!user)
      throw new Error('User not exists')
    return user

  }
  async authUser(email: string, password: string, conected: string) {
    const findUser = await this.findOneByEmail(email)

    if (!await bcrypt.compare(password, findUser.password)) {
      throw new Error('Invalid password')
    }
    const token = jwt.sign({ id: findUser.id }, '647431b5ca55b04fdf3c2fce31ef1915', {
      expiresIn: conected ? 1892160000000 : 86400
    })
    return { user: findUser, token: token }

  }
}

export default UserRepository
