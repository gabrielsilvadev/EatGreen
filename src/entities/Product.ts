import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import Images from './Image'
import Company from "../entities/Company"
import ProductOrders from './Product_orders'

@Entity('product')
export default class Product {

  @PrimaryGeneratedColumn("uuid", { name: 'id_product' })

  id: string;

  @Column()

  name: string;

  @Column()

  price: number;

  @Column()

  category: string;

  @OneToMany(() => Images, images => images.product, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: "id_product" })
  images: Images[];

  @ManyToOne(() => Company, company => company, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: "id_company" })
  company: Company;

  @OneToMany(() => ProductOrders, productOrders => productOrders, { cascade: ['insert', 'update'] })

  @JoinColumn({ name: 'id_product' })
  productOrders: ProductOrders[]

  constructor(id: string, name: string, price: number, image: Images[]) {
    this.id = id
    this.name = name
    this.price = price
    this.images = image
  }


}
