import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const productRouters = Router()
const productController = new controller.ProductController

productRouters.post("/create",isAuthenticated, productController.create)
productRouters.patch("/delete/:id",isAuthenticated , productController.deleteProduct)
productRouters.get("/", productController.getAllProduct)
productRouters.get("/company/:id",isAuthenticated,productController.getProductByCompany)
productRouters.post("/save/:id",isAuthenticated, productController.updateProduct)

export default productRouters
