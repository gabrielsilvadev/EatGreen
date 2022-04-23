import { AdressInterface } from "./adress.interface"
import { OrderInterface } from "./order.interface"

export interface UserInterface {
  first_name?: string;
  last_name: string;
  email: string;
  password: string;
  token?: string;
  telephone: string;
  passwordResetToken?: string;
  passwordResetExpire?: Date;
  cpf: string
  adress?: AdressInterface[];
  order?: OrderInterface[]
}
