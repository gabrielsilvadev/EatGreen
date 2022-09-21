import { UserInterface } from './user.interface'
export interface AdressInterface {
  adress: string;
  cep: string;
  complement: string;
  city: string;
  states: string;
  number: number,
  idUser: string,
  user: UserInterface;
}
