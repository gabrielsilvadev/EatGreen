import { EntityRepository, Repository } from "typeorm"
import Orders from "../entities/Order"
import { OrderInterface } from "../base-interfaces/order.interface"

@EntityRepository(Orders)
class Order extends Repository<Orders>{
  async createOrder(order: OrderInterface) {
    const saveOrder = this.create(order)
    return await this.save(saveOrder)

  }
  async upgradeOrderStatus(id: string, status: string) {
    const OrderByUser = await this.update(id, { orderStatus: status })
    return { order: OrderByUser }

  }
  async deleteOrder(id: string) {
    const OrderByUser = await this.findOneOrFail(id)
    return await this.delete(OrderByUser.id)
  }

  async getOrder(id: string) {
    const order = await this.findOneOrFail(id, { relations: ['order'] })
    return { order: order }

  }
  async getOrdersByCompanyOrUser(id: string) {
    const OrderByUsers = await this.find({ where: { company: id } || { user: id } })
    return { order: OrderByUsers }

  }
}
export default Order
