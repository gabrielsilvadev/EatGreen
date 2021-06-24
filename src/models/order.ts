import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import User from './user'
import Company from "../models/company"
import ProductOrder from './product_orders'
@Entity('order')
export default class Order {

    @PrimaryGeneratedColumn("uuid", { name: "id_order" })

    id: string;

    @Column({ name: 'order_status' })

    orderStatus: string;

    @CreateDateColumn({ name: 'update_at' })

    updateAt: Date;

    @Column({ name: 'form_of_payment' })

    formOfPayment: string;

    @Column({ name: "price_total" })
    priceTotal: number;

    @ManyToOne(() => User, user => user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Company, company => company, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'id_company' })
    company: Company;

    @Column({name: "created_at"})
    createdAt: Date

    @OneToMany(() => ProductOrder, productOrder => productOrder)
    @JoinColumn({ name: 'id_product_order' })
    productOrder: ProductOrder[];




}