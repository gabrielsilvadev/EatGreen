import  {passwordHash, comparePassword, createToken}  from "../config/isAuthenticated"
import { EntityRepository, Repository } from "typeorm"
import User from "../entities/User"

import transportEmail from '../middleware/mailer'
import { UserInterface } from "../base-interfaces/user.interface"

@EntityRepository(User)
class UserRepository extends Repository<User>{
  async createAndSave(user: UserInterface) {
    user.password = await passwordHash(user.password)
    const newUser = this.create(user)
    await this.save(newUser)
    return newUser
  }

  async resetPassword(email: string, token: string, password: string) {
    const user = await this.findOneByEmail(email)

    if (token !== user.passwordResetToken)
      throw new Error('Token invalid')

    const now = new Date()

    if (now > user.passwordResetExpire)
      throw new Error('Token expired')
    user.password = await passwordHash(password)
    await this.save(user)
    return user

  }

  async forgot(email: string) {
    console.log(email)
    const findUser = await this.findOneByEmail(email)
    const token = await createToken(findUser.id)
    const now = new Date()
    now.setHours(now.getHours() + 1)
    await this.update(findUser.id, {
      passwordResetToken: token,
      passwordResetExpire: now
    })

    await transportEmail.transporte(email, token)
    return { sucess: 'token enviado' }
  }
  async updateUser(user: UserInterface, id: string) {
    const UpdateByUser = await this.update(id, user)
    return UpdateByUser

  }

  async findOneById(id: string) {
    const user = await this.findOne({ where: { id } })
    if (!user)
      throw new Error('User not exists')
    return user

  }

  async findOneByEmail(email: string) {
    const user = await this.findOne({ where: { email } })
    if (!user)
      throw new Error('User not exists')
    return user

  }
  async authUser(email: string, password: string, conected: boolean) {
    const findUser = await this.findOneByEmail(email)

    if (!await comparePassword(password, findUser.password)) {
      throw new Error('Invalid password')
    }
    const token = await createToken(findUser.id, conected)
    findUser.token = token
    return findUser

  }
}

export default UserRepository
