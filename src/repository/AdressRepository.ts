
import { EntityRepository, Repository } from 'typeorm';
import Adress from '../entities/Adress';
import { AdressInterface } from '../base-interfaces/adress.interface';

@EntityRepository(Adress)
export default class AdressRepository extends Repository<Adress> {

  async create(adress: AdressInterface) {
    const createAdress = this.create(adress)
    return  await this.save(createAdress)
 
  }
  async update(id: string, adress: AdressInterface) {
    return await this.update(id, adress)
     

  }
  async delete(id: string) {
      const adressDelete = await this.findOneOrFail({ id: id })
      await this.delete(adressDelete.id)
      return { message: `deletado com sucesso ` }
  }
}
