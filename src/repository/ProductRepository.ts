
import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';
import { ProductInterface } from '../base-interfaces/product.interface';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {

  async Create(product: ProductInterface) {
    const createProduct = this.create(product)
    return  await this.save(createProduct)
 
  }
  async update(id: string, product: ProductInterface) {
    return await this.update(id, product)
     

  }
  async delete(id: string) {
      const productDelete = await this.findOneOrFail({ id: id })
      await this.delete(productDelete.id)
      return { message: `deletado com sucesso ` }
  }
  async getAllProduct() {
      const findProduct = await this.find({
        relations: ['images', 'company']
      })
      return findProduct
  }

  
  async getProductByCompany(id_company: string){
      const productCategory = await this.find({where:{company: id_company}})
      return productCategory
  }
 

}
