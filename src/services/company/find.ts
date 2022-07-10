import { CompanyInterface } from "../../base-interfaces/company.interface"
import CompanyRepository from "../../repository/CompanyRepository"
import { getCustomRepository } from "typeorm"

class FindCompanyService {
  async execute(id: string) {
    const companyRepository = getCustomRepository(CompanyRepository)
    return await companyRepository.findByCompany(id)
  }
}

export default FindCompanyService
