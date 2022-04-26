import { UserInterface } from "../../base-interfaces/user.interface"
import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"
import User from "../../entities/User"
class CreateUserService {
  async execute(user: UserInterface): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    return await userRepository.createAndSave(user)
  }
}

export default CreateUserService
