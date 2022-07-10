import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const productRouters = Router()
const productController = new controller.ProductController

productRouters.post("/create",isAuthenticated, productController.create)
productRouters.patch("/delete/:id",isAuthenticated , productController.deleteProduct)
productRouters.post("/", productController.getAllProduct)
productRouters.post("/company/:id",isAuthenticated,productController.getProductByCompany)
productRouters.post("/save",isAuthenticated, productController.updateProduct)

export default productRouters
