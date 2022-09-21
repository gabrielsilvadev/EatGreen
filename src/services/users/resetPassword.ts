import { UserInterface } from "../../base-interfaces/user.interface"
import UserRepository from "../../repository/UserRepository"
import { getCustomRepository } from "typeorm"

class ResetPasswordUserService {
  async execute({email, password}: UserInterface, token: string): Promise<any> {
    const userRepository = getCustomRepository(UserRepository)
    return await userRepository.resetPassword(email, token, password)
  }
}

export default ResetPasswordUserService
