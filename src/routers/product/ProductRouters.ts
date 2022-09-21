import { Router } from 'express'
import controller from '../../controller'
import multer from 'multer'
import isAuthenticated  from "../../middleware/alphaUser"
import uploadConfig from '../../config/config'
const productRouters = Router()
const productController = new controller.ProductController
const upload = multer();
productRouters.post("/create", upload.array('images') ,isAuthenticated, productController.create)
productRouters.patch("/delete/:id",isAuthenticated , productController.deleteProduct)
productRouters.get("/", productController.getAllProduct)
productRouters.get("/company/:id",isAuthenticated,productController.getProductByCompany)
productRouters.post("/save/:id",isAuthenticated, productController.updateProduct)

export default productRouters
