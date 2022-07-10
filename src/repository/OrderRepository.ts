import { EntityRepository, Repository } from "typeorm"
import Orders from "../entities/Order"
import { OrderInterface } from "../base-interfaces/order.interface"

@EntityRepository(Orders)
class Order extends Repository<Orders>{
  async Create(order: OrderInterface) {
    const saveOrder = this.create(order)
    return await this.save(saveOrder)

  }
  async UpdateOrderStatus(id: string, status: string) {
    const OrderByUser = await this.update(id, { orderStatus: status })
    return { order: OrderByUser }

  }
  async Delete(id: string) {
    const OrderByUser = await this.findOneOrFail(id)
    return await this.delete(OrderByUser.id)
  }

  async Get() {
    const order = await this.find({ relations: ['order'] })
    return { order: order }

  }
  async GetOrdersByCompanyOrUser(id: string) {
    const OrderByUsers = await this.find({ where: { company: id } || { user: id } })
    return { order: OrderByUsers }

  }
}
export default Order
