
import { CompanyInterface } from "./company.interface"
import { ProductOrderInterface } from "./product_orders.interface"

export interface OrderInterface {
  orderStatus: string;
  updateAt: Date;
  formOfPayment: string;
  priceTotal: number;
  company: CompanyInterface;
  createdAt: Date
  productOrder?: ProductOrderInterface[];




}
