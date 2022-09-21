import AdressRepository from "../../repository/AdressRepository"
import { getCustomRepository } from "typeorm"

class DeleteService {
  async execute(id: string): Promise<{}> {
    const adressRepository = getCustomRepository(AdressRepository)
    return await adressRepository.Delete(id)
  }
}

export default DeleteService
