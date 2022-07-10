import { OrderInterface } from "../../base-interfaces/order.interface"
import OrderRepository from "../../repository/OrderRepository"
import { getCustomRepository } from "typeorm"

class CreateOrderService {
  async execute(order: OrderInterface): Promise<{}> {
    const orderRepository = getCustomRepository(OrderRepository)
    return await orderRepository.Create(order)
  }
}

export default CreateOrderService
