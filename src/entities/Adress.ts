import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User'

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
  number: number;

  @Column()
  city: string;

  @Column()
  states: string;
  @ManyToOne(() => User, user => user)
  @JoinColumn()
  user: User;


}
