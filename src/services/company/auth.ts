import CompanyRepository from "../../repository/CompanyRepository"
import { getCustomRepository } from "typeorm"

class AuthCompanyService {
  async execute(email: string, password: string, conected: boolean): Promise<{}> {
    const companyRepository = getCustomRepository(CompanyRepository)
    return await companyRepository.auth(email, password, conected)
  }
}
export default AuthCompanyService
