import { OrderInterface } from "../../base-interfaces/order.interface"
import OrderRepository from "../../repository/OrderRepository"
import { getCustomRepository } from "typeorm"

class GetOrderService {
  async execute(): Promise<{}> {
    const orderRepository = getCustomRepository(OrderRepository)
    return await orderRepository.Get()
  }
}

export default GetOrderService
