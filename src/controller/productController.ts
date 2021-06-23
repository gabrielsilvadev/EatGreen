import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Product from '../models/product'


export default {

  async createProduct(request: Request, response: Response) {
    const productRepository = getRepository(Product)

    const requestImage = request.files as Express.Multer.File[];

    const images = requestImage.map(image => {
      return { path: image.filename }
    });

   
    const createObjectProduct = {
      name: request.body.name,
      price: request.body.price,
      category: request.body.category,
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
        relations: ['images']
      })
      return response.status(200).json(findProduct)
    } catch (err) {
      return response.status(500).json({ err: err})
    }
  },
  async getProduct(request: Request, response: Response){
    const getRepositoryProduct = getRepository(Product)
    const id:string = request.params.id
    
    try{
     const productId = await getRepositoryProduct.findOneOrFail(id, {relations: ['images']})
     return response.status(200).json(productId)
    }catch(err){
     return response.status(500).json({er: err})
    }
  },
 

}