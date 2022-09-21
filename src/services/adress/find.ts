import AdressRepository from "../../repository/AdressRepository"
import { getCustomRepository } from "typeorm"
import { AdressInterface } from "../../base-interfaces/adress.interface"

class FindService {
  async execute(id: string): Promise<AdressInterface[]> {
    const adressRepository = getCustomRepository(AdressRepository)
    return await adressRepository.findByUser(id)
  }
}

export default FindService
