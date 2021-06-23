import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Product from './product'
import Order from "./order";
@Entity('product_orders')
export default class Adress {

    @PrimaryGeneratedColumn('increment')    
    id: number;

    @Column({name: 'quantity_products_ordered'})
    quantityProductsOrdered: number;
    
    @Column({name:"price_unitary"})
    priceUnitary: number;
    
    @ManyToOne(()=> Order, order => order, 
    {cascade: ['insert', 'update']})
    @JoinColumn({name: "id_order"})
    order: Order

    @ManyToOne(()=> Product, product => product,{
    cascade:['insert','update']})
    @JoinColumn({name:'id_product'})
    product: Product;

}