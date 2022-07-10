import { Request, Response } from "express"
import UserServices from "../services/users"
export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
      const userData = request.body;
      const createUser = new UserServices.CreateUserService()
      try{
      const user = await createUser.execute(userData)
      return response.status(200).json(user)
    } catch (err) {
      throw new Error(`Dados inválidos: ${err}`)
    }
  }
  async save(request: Request, response: Response): Promise<Response>{
   try{
     const userData =request.body
     const saveUser = new UserServices.SaveUserService()
     const user = await saveUser.execute(userData, request.params.id)
      return response.status(200).json(user)
  } catch (err) {
    throw new Error(`Dados inválidos: ${err}`)
  }
  }
  async auth(request: Request, response: Response): Promise<Response>{
    try{
      const userData =request.body
      const saveUser = new UserServices.AuthUserService()
      const user = await saveUser.execute(userData.email, userData.password, userData.conected)
       return response.status(200).json(user)
   } catch (err) {
     throw new Error(`Login Invalido: ${err}`)
   }
   }
   async forgot(request: Request, response: Response): Promise<Response>{
    try{
      const userData =request.body
      const saveUser = new UserServices.ForgotUserSevice()
      await saveUser.execute(userData.email)
       return response.status(200).json()
   } catch (err) {
     throw new Error(`Token não enviado: ${err}`)
   }
   }
   async resetPassword(request: Request, response: Response): Promise<Response>{
    try{
      const userData =request.body
      const saveUser = new UserServices.ResetPasswordUserService()
      await saveUser.execute(userData, userData.token)
       return response.status(200).json()
   } catch (err) {
     throw new Error(`Token não enviado: ${err}`)
   }
   }
   

   
}
