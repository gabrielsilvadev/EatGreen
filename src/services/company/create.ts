import { CompanyInterface } from "../../base-interfaces/company.interface"
import CompanyRepository from "../../repository/CompanyRepository"
import { getCustomRepository } from "typeorm"

class CreateCompanyService {
  async execute(company: CompanyInterface): Promise<CompanyInterface> {
    const companyRepository = getCustomRepository(CompanyRepository)
    return await companyRepository.create(company)
  }
}

export default CreateCompanyService
