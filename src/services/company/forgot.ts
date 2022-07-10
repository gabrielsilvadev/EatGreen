import CompanyRepository from "../../repository/CompanyRepository"
import { getCustomRepository } from "typeorm"

class ForgotCompanyService {
  async execute(email: string): Promise<{}> {
    const companyRepository = getCustomRepository(CompanyRepository)
    return await companyRepository.forgot(email)
  }
}
export default ForgotCompanyService
