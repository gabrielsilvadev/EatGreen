import { UserInterface } from "../../base-interfaces/user.interface"
import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"

class ForgotUserService {
  async execute(email: string): Promise<any> {
    const userRepository = getCustomRepository(UserRepository)
    return await userRepository.forgot(email)
  }
}

export default ForgotUserService
