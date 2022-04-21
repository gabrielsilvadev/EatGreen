import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Product from './Product'

@Entity('images')
export default class Images {

  @PrimaryGeneratedColumn('increment')

  id: number;

  @Column()

  path: string;

  @ManyToOne(() => Product, product => product.images)
  @JoinColumn({ name: 'id_product' })
  product: Product;


}
