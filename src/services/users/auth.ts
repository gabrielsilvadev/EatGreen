import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"
import User from "../../entities/User"


class CreateUserService {
  async execute(email: string,password: string, conected: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    return await userRepository.authUser(email,password, conected)
  }
}

export default CreateUserService
