import ProductOrder from '../entities/Product_orders'
import Product from './product_view'
export default {
  render(productOrder: ProductOrder) {
    return {
      id: productOrder.id,
      quantityProductOrdered: productOrder.quantityProductsOrdered,
      product: Product.render(productOrder.product),
    };
  },
  renderMany(productOrder: ProductOrder[]) {
    return productOrder.map(productOrder => this.render(productOrder));
  }
};
