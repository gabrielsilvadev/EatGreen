import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import User from './user'

@Entity('adress')
export default class Adress {

    @PrimaryGeneratedColumn('increment')
    id?: string;

    @Column()
    adress: string;

    @Column()
    cep: string;
    
    @Column()
    complement: string;
    
    @Column()
    city: string;
    
    @Column()
    states: string;

    @ManyToOne(()=> User, user => user,{
    cascade:['insert','update']
    })
    @JoinColumn({name:'id_user'})
    user?: User;
   

}