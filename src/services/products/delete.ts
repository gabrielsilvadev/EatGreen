import { ProductInterface } from "../../base-interfaces/product.interface"
import ProductRepository from "../../repository/ProductRepository"
import { getCustomRepository } from "typeorm"

class CreateCompanyService {
  async execute(id: string): Promise<{}> {
    const productRepository = getCustomRepository(ProductRepository)
    return await productRepository.delete(id)
  }
}

export default CreateCompanyService
