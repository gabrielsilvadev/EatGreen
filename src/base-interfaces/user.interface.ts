import Adress from "../entities/Adress"
import Order from "../entities/Order"

export interface UserInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  telephone: string;
  passwordResetToken?: string;
  passwordResetExpire?: Date;
  cpf: string
  adress?: Adress[];
  order?: Order[]
}
