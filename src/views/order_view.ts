import Order from '../entities/Order'
import ProductOrder from './product_order_view'
import User from './user_view'
export default {
  render(order: Order) {
    return {
      id: order.id,
      orderStatus: order.orderStatus,
      date: order.updateAt,
      formOfPayment: order.formOfPayment,
      user: order.user,
      productOrder: ProductOrder.renderMany(order.productOrder)
    };
  },
  renderMany(order: Order[]) {
    return order.map(orders => this.render(orders));
  }
};
