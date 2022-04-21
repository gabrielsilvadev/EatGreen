import User from '../entities/User'

export interface Adress {
  adress: string;
  cep: string;
  complement: string;
  city: string;
  states: string;
  user: User;
}
