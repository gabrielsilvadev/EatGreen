import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Product from '../models/product'
import Company from "../models/company";
import fs from "fs";

export default {

  async createProduct(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const companyRepository = getRepository(Company)
    const requestImage = request.files as Express.Multer.File[];
    const findCompany = await companyRepository.findOneOrFail(request.params.id)
   const images = requestImage.map(image => {
      return { path:  fs.readFileSync(image.path, "base64") }
    
    });

    const createObjectProduct = {
      name: request.body.name,
      price: request.body.price,
      category: request.body.category,
      company: findCompany,
      images: images
    }
    const product = productRepository.create(createObjectProduct)
    try {
      await productRepository.save(product)
      return response.status(201).json(product)
    } catch (err) {
      return response.status(500).json({ message: err})
    }

  },
  async updateProduct(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const id: string = request.params.id
    try {
      await productRepository.update(id, request.body)
      return response.status(200).json({ message: `atualizado com sucesso ` })
    } catch (err) {
      return response.status(500).json({ message: err })
    }

  },
  async deleteProduct(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const id: string = request.params.id
    try {
      const productDelete = await productRepository.findOneOrFail({ id: id })
      await productRepository.delete(productDelete.id)
      return response.status(200).json({ message: `deletado com sucesso ` })
    } catch (err) {
      return response.status(500).json({ message: err })
    }
  },
  async getAllProduct(request: Request, response: Response) {
    const getRepositoryProduct = getRepository(Product)
    try {
      const findProduct = await getRepositoryProduct.find({
        relations: ['images', 'company']
      })
      
      return response.status(200).json(findProduct)
    } catch (err) {
      return response.status(500).json({ err: err})
    }
  },
 /* async getProduct(request: Request, response: Response){
    const getRepositoryProduct = getRepository(Product)
    const category:string = request.params.category
    
    try{
     const productCategory = await getRepositoryProduct.findOneOrFail({category: category}, {relations: ['images']})
     return response.status(200).json(productCategory)
    }catch(err){
     return response.status(500).json({er: err})
    }
  },*/
  
  async getProductByCompany(request: Request, response: Response){
    const getRepositoryProduct = getRepository(Product)
    const company_id = request.params.id_company
    
    try{
      let productCategory = await getRepositoryProduct.find({where:{company: company_id}})
      return response.status(200).json(productCategory)
    }catch(err){
     return response.status(500).json({er: err})
    }
  },
 

}