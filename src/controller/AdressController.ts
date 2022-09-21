import AdressService from '../services/adress'
import UserServices from '../services/users'
import {Request, Response} from "express"
export default class AdressController {
  async create(request: Request, response: Response){
     const AdressRequest = new AdressService.CreateAdressService()
     const UserRequest  = new  UserServices.FindService()
     try {
      const user = await UserRequest.execute(request.body.idUser)
      request.body.user = user
      const adress = await AdressRequest.execute(request.body)
      return response.status(201).json(adress)
    } catch (err) {
      return response.status(500).json({ message: err })
    }
  }


  async delete(request: Request, response: Response){
    const AdressRequest = new AdressService.DeleteAdressService()
    try{
     await AdressRequest.execute(request.params.id)
     return response.status(200).send()
    }catch(err){
       return response.status(500).json({err})
    }
  }
  async update(request: Request, response: Response){
    const AdressRequest = new AdressService.SaveAdressService()
    await AdressRequest.execute(request.params.id, request.body)
    return response.status(200).send()
  }

  async find(request: Request, response: Response){
    const AdressRequest = new AdressService.FindAdressService()
    const adress =  await AdressRequest.execute(request.body.idUser)
    return response.status(200).send(adress)
  }
}
