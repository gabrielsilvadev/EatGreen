
import { Request, Response} from "express" ;
import Company from "../models/company"
import {getRepository} from "typeorm"
export default {
    async create(request: Request, response: Response){
        const  repositoryCompany =  getRepository(Company)
        const requestImage = request.files as Express.Multer.File;

        const images = requestImage.map(image => {
          return { path: image.filename }
        });
    
       
        const createObjectProduct = {
          name: request.body.name,
          price: request.body.price,
          category: request.body.category,
          images: images
        }
    }
}