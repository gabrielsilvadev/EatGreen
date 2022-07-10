import { OrderInterface } from "../../base-interfaces/order.interface"
import OrderRepository from "../../repository/OrderRepository"
import { getCustomRepository } from "typeorm"

class GetOrderByCompanyOrderService {
  async execute(id: string): Promise<{}> {
    const orderRepository = getCustomRepository(OrderRepository)
    return await orderRepository.GetOrdersByCompanyOrUser(id)
  }
}

export default GetOrderByCompanyOrderService
