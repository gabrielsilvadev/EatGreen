import { Request, Response } from 'express'
import ProductServices from '../services/products'
import CompanyServices from '../services/company'
import fs from "fs";

export default class ProductController {

  async create(request: Request, response: Response) {
    const company = new CompanyServices.FindCompanyService()
    const productRequest = new ProductServices.CreateProductService()
    const requestImage = request.files as Express.Multer.File[];
    const findCompany = await company.execute(request.params.id)
    const images = requestImage.map(image => {
      return { path:  fs.readFileSync(image.path, "base64") }
    
    });

    const createObjectProduct = {
      name: request.body.name,
      price: request.body.price,
      category: request.body.category,
      company: findCompany,
      images: images[0]
    }
    try {
     const newProduct = await  productRequest.execute(createObjectProduct)
      return response.status(201).json(newProduct)
    } catch (err) {
      return response.status(500).json({ message: err})
    }

  }
  async updateProduct(request: Request, response: Response) {
    const productRepository =  new ProductServices.SaveProductService()
    const id: string = request.params.id
    try {
      await productRepository.execute(id, request.body)
      return response.status(200).json({ message: `atualizado com sucesso ` })
    } catch (err) {
      return response.status(500).json({ message: err })
    }

  }
  async deleteProduct(request: Request, response: Response) {
    const productRequest = new ProductServices.DeleteProductService()
    const id: string = request.params.id
    try {
      await productRequest.execute(id)
      return response.status(200).json({ message: `deletado com sucesso ` })
    } catch (err) {
      return response.status(500).json({ message: err })
    }
  }
  async getAllProduct(request: Request, response: Response) {
    const productRequest = new ProductServices.GetProductSevice()
    try {
      const findProduct = await productRequest.execute()
      return response.status(200).json(findProduct)
    } catch (err) {
      return response.status(500).json({ err: err})
    }
  }

  
  async getProductByCompany(request: Request, response: Response){
    const productRequest = new ProductServices.GetCompanyProductService()
    const company_id = request.params.id_company
    
    try{
      let productCategory = await productRequest.execute(company_id)
      return response.status(200).json(productCategory)
    }catch(err){
     return response.status(500).json({er: err})
    }
  }
 

}
