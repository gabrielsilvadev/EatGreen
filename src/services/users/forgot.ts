import { UserInterface } from "../../base-interfaces/user.interface"
import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"

class CreateUserService {
  async execute({email}: UserInterface): Promise<any> {
    const userRepository = getCustomRepository(UserRepository)
    return await userRepository.forgot(email)
  }
}

export default CreateUserService
