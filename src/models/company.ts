import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import  Product  from "../models/product";
import Images from "../models/image"
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
    
    @Column()

    email:string;
    
    @Column()
    
    telephone: string;
    
    @Column({nullable: true, name: 'password_reset_token'})
    passwordResetToken: string;
    
    @Column({nullable:  true  ,name: 'password_reset_expire'})
    passwordResetExpire: Date;
    
    @Column()
    adress: string;
    
    @Column()
    city: string;

    @Column()
    states: string;

    @Column()
    cep: string
    
    @OneToMany(()=> Product, product => product)
    @JoinColumn({name: 'id_product'})
    product: Product[];

    @OneToMany(()=> Images, images => images)
    @JoinColumn({name: 'id_images'})
    images: Images[]

    @OneToMany(()=> Order, Order => Order)
    @JoinColumn({name: 'id_order'})
    Order: Order[];
}