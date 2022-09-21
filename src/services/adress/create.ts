import { AdressInterface } from "../../base-interfaces/adress.interface"
import AdressRepository from "../../repository/AdressRepository"
import { getCustomRepository } from "typeorm"

class CreateAdressService {
  async execute(adress: AdressInterface): Promise<AdressInterface> {
    const adressRepository = getCustomRepository(AdressRepository)
    return await adressRepository.Create(adress)
  }
}

export default CreateAdressService
