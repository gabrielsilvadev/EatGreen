import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/config'
import ControllerProduct from './controller/productController';
import ControllerUser from './controller/UserController'
import ControllerCompany from './controller/companyController';
import middlewareUser from './middleware/alphaUser'

const routes = Router();
const upload = multer(uploadConfig);

/*routes.get('/product/category/:category', ControllerProduct.getProduct)*/
routes.get("/product/all/", ControllerProduct.getAllProduct)


// autetication
routes.post("/user/auth/", ControllerUser.authUser)
routes.post('/user/forgot', ControllerUser.forgot)
routes.post('/user/reset/password', ControllerUser.resetPassword)
routes.post('/user/validation', ControllerUser.validationUser)
routes.post("/user/create/", ControllerUser.createUser)

routes.post('/company/create', ControllerCompany.createCompany)
routes.post('/company/auth', ControllerCompany.authCompany)


//user
routes.use(middlewareUser)

routes.post("/user/create/order/:id", ControllerUser.createOrderByuser)
routes.delete("/user/deleteOrder/:id", ControllerUser.deleteOrder)
routes.patch("/user/update/:id", ControllerUser.updateUser)
routes.patch("/user/adress/update/:id", ControllerUser.updateAdress)
routes.delete("user/adress/delete", ControllerUser.deleteAdress)
routes.get("/user/order/:id", ControllerUser.getOrder)
routes.post("/user/create/adress/:id", ControllerUser.createAdress)
//admin
routes.get("/company/orders/:id_company", ControllerCompany.getOrders)
routes.post("/company/reset_password", ControllerCompany.resetPassword)
routes.post("/company/forgot", ControllerCompany.forgot)
routes.patch("/company/update/:id", ControllerCompany.updateCompany)
routes.patch("/company/status/:status/:id", ControllerUser.upgradeOrderStatus)

routes.get("/company/product/:id_company", ControllerProduct.getProductByCompany)

routes.post('/product/create/:id', upload.array('images'), ControllerProduct.createProduct);
routes.patch('/product/upload/:id', ControllerProduct.updateProduct)
routes.delete("/product/delete/:id", ControllerProduct.deleteProduct)



export default routes;