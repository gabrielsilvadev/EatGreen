
import { OrderInterface } from "./order.interface"
import { ProductInterface } from "./product.interface"
export interface ProductOrderInterface {
  quantityProductsOrdered: number;
  priceUnitary: number;
  order: OrderInterface;
  product: ProductInterface;

}
