import { OrderInterface } from "../../base-interfaces/order.interface"
import OrderRepository from "../../repository/OrderRepository"
import { getCustomRepository } from "typeorm"

class UpdateStatusOrderService {
  async execute(id: string, status: string): Promise<{}> {
    const orderRepository = getCustomRepository(OrderRepository)
    return await orderRepository.UpdateOrderStatus(id, status)
  }
}

export default UpdateStatusOrderService
