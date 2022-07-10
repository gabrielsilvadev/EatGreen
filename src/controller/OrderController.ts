import OrderService from '../services/order'
import {Request, Response} from "express"
export default class OrderController {
  async create(request: Request, response: Response){
     const OrderRequest = new OrderService.CreateOrderService()
     try {
      const order = await OrderRequest.execute(request.body)
      return response.status(201).json(order)
    } catch (err) {
      return response.status(500).json({ message: err })
    }
  }


  async delete(request: Request, response: Response){
    const OrderRequest = new OrderService.DeleteOrderService()
    try{
     await OrderRequest.execute(request.params.id)
     return response.status(200).send()
    }catch(err){
       return response.status(500).json({err})
    }
  }
  async updateStatusByCompany(request: Request, response: Response){
    const OrderRequest = new OrderService.UpdateStatusOrderService()
    await OrderRequest.execute(request.params.id, request.params.status)
    return response.status(200).send()
  }
  async get(request: Request, response: Response){
    const OrderRequest = new OrderService.GetOrderService()
    const orders = await OrderRequest.execute()
    return response.status(200).json(orders)
  }

  async getOrderByCompany(request: Request, response: Response){
    const OrderRequest = new OrderService.GetOrderByCompanyOrderService()
    const orders = await OrderRequest.execute(request.params.id)
    return response.status(200).json(orders)
  }
}
