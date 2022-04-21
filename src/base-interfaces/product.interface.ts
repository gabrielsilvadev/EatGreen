import Images from '../entities/Image'
import Company from "../entities/Company"
import ProductOrders from '../entities/Product_orders'

export interface Product {
  name: string;
  price: number;
  category: string;
  images: Images[];
  company: Company;
  productOrders: ProductOrders[]

}
