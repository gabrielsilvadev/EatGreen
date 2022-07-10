import AdressRepository from "../../repository/AdressRepository"
import { getCustomRepository } from "typeorm"

class DeleteService {
  async execute(id: string): Promise<{}> {
    const adressRepository = getCustomRepository(AdressRepository)
    return await adressRepository.delete(id)
  }
}

export default DeleteService
