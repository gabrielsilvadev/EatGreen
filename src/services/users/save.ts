import { UserInterface } from "../../base-interfaces/user.interface"
import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"
import User from "../../entities/User"
class CreateUserService {
  async execute(user: UserInterface, id: string): Promise<any> {
    const userRepository = getCustomRepository(UserRepository)
    const saveUser = await userRepository.updateUser(user, id)
    return  saveUser
  }
}

export default CreateUserService
