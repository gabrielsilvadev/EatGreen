import { ImagesInteface } from './image.interface'
import { CompanyInterface } from "./company.interface"
import { ProductOrderInterface } from './product_orders.interface'

export interface ProductInterface {
  name: string;
  price: number;
  category: string;
  images: ImagesInteface;
  company: CompanyInterface;

}
