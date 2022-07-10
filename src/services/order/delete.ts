import { OrderInterface } from "../../base-interfaces/order.interface"
import OrderRepository from "../../repository/OrderRepository"
import { getCustomRepository } from "typeorm"

class DeleteOrderService {
  async execute(id: string): Promise<{}> {
    const orderRepository = getCustomRepository(OrderRepository)
    return await orderRepository.Delete(id)
  }
}

export default DeleteOrderService
