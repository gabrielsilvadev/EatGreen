import { ProductInterface } from "../../base-interfaces/product.interface"
import ProductRepository from "../../repository/ProductRepository"
import { getCustomRepository } from "typeorm"

class CreateCompanyService {
  async execute(id:string,product: ProductInterface): Promise<{}> {
    const productRepository = getCustomRepository(ProductRepository)
    return await productRepository.update(id, product)
  }
}

export default CreateCompanyService
