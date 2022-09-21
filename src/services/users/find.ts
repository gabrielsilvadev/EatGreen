import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"
import User from "../../entities/User"
class FindUserService {
  async execute(id: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    return await userRepository.findOneById(id)
  }
}

export default FindUserService
