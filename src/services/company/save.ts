import { CompanyInterface } from "../../base-interfaces/company.interface"
import CompanyRepository from "../../repository/CompanyRepository"
import { getCustomRepository } from "typeorm"

class SaveCompanyService {
  async execute(id: string,company: CompanyInterface): Promise<{}> {
    const companyRepository = getCustomRepository(CompanyRepository)
    return await companyRepository.update(id,company)
  }
}

export default SaveCompanyService
