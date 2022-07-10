import AdressRepository from "../../repository/AdressRepository"
import { getCustomRepository } from "typeorm"
import { AdressInterface } from "../../base-interfaces/adress.interface"

class UpdateService {
  async execute(id: string, adress: AdressInterface): Promise<{}> {
    const adressRepository = getCustomRepository(AdressRepository)
    return await adressRepository.update(id, adress)
  }
}

export default UpdateService
