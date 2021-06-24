import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import  Product  from "../models/product";
import Adress from "./adress";
import Order from "../models/order";
@Entity('company')
export default class User {

    @PrimaryGeneratedColumn("uuid", {name: 'company_id'})
    
    id: string;

    @Column()

    name:string;

    @Column({unique: true})

    cnpj:string;

    @Column()

    password:string;
    
    @Column({unique: true})

    email:string;
    
    @Column()
    
    telephone: string;
    
    @Column({nullable: true, name: 'password_reset_token'})
    passwordResetToken: string;
    
    @Column({nullable:  true  ,name: 'password_reset_expire'})
    passwordResetExpire: Date;
    
    @OneToOne(()=> Adress, adress=> adress)
    @JoinColumn({name: 'id_adress'})
    adress?: Adress

    @OneToMany(()=> Product, product => product)
    @JoinColumn({name: 'id_product'})
    product: Product[];

 
    @OneToMany(()=> Order, Order => Order)
    @JoinColumn({name: 'id_order'})
    Order: Order[];
}