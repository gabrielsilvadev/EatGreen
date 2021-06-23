import {Entity,Column,PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm';
import Product from './product'
import Company from './company'
@Entity('images')
export default class Images {

    @PrimaryGeneratedColumn('increment')
    
    id: number;

    @Column()

    path: string;
    
    @ManyToOne(()=>Product, product => product.images)
    @JoinColumn({name:'id_product'})
    product: Product;

    @ManyToOne(()=> Company, company => company.images)
    @JoinColumn({name:'id_company'})
    company: Company;
    

}