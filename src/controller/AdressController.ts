import AdressService from '../services/adress'
import {Request, Response} from "express"
export default class OrderController {
  async create(request: Request, response: Response){
     const AdressRequest = new AdressService.CreateAdressService()
     try {
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
}
