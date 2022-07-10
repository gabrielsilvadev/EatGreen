import { ProductInterface } from "../../base-interfaces/product.interface"
import ProductRepository from "../../repository/ProductRepository"
import { getCustomRepository } from "typeorm"

class CreateCompanyService {
  async execute(id_company: string): Promise<{}> {
    const productRepository = getCustomRepository(ProductRepository)
    return await productRepository.getProductByCompany(id_company)
  }
}

export default CreateCompanyService
