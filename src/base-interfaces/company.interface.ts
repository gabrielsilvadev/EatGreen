
import { AdressInterface } from "./adress.interface";
import { ProductInterface } from "./product.interface"
import { OrderInterface } from "./order.interface"

export interface CompanyInterface {
  name: string;
  cnpj: string;
  password: string;
  email: string;
  telephone: string;
  passwordResetToken: string;
  passwordResetExpire: Date;
  adress?: AdressInterface;
  product: ProductInterface[];
  Order: OrderInterface[];
}
