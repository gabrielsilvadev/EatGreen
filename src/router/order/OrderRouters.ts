import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const productRouters = Router()
const productController = new controller.OrderController

productRouters.post("/create",isAuthenticated, productController.create)
productRouters.patch("/delete/:id",isAuthenticated , productController.delete)
productRouters.post("/",isAuthenticated, productController.get)
productRouters.post("/company/:id",isAuthenticated, productController.getOrderByCompany)
productRouters.post("/:status/:id",isAuthenticated, productController.updateStatusByCompany)

export default productRouters
