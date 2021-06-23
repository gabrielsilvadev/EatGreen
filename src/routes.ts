import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/config'
import ControllerProduct from './controller/productController';
import ControllerUser from './controller/UserController'
import  middleware  from '../src/middleware/alpha'
const routes = Router();
const upload = multer(uploadConfig);

// admin
routes.post('/product/create/', upload.array('images'), ControllerProduct.createProduct);
routes.patch('/product/upload/:id', ControllerProduct.updateProduct)
routes.delete("/product/delete/:id", ControllerProduct.deleteProduct)

routes.get('/product/:id', ControllerProduct.getProduct)

routes.get("/product/all/", ControllerProduct.getAllProduct)


routes.post("/user/create/", ControllerUser.createUser)

// autetication
routes.post("/user/auth/", ControllerUser.authUser)
routes.post('/user/forgot', ControllerUser.forgot)
routes.post('/user/reset/password', ControllerUser.resetPassword)
routes.post('/user/validation', ControllerUser.validationUser)

//user
routes.use(middleware)
routes.post('/user/create/order/:id', ControllerUser.createOrder)
routes.post("/user/create/adress/:id/", ControllerUser.createAdressByuser)
routes.get("/user/:id", ControllerUser.getUser)
routes.get("/user/getOrder/:id/:idAdress", ControllerUser.getOrder)
routes.delete("/user/deleteOrder/:id", ControllerUser.deleteOrder)
routes.patch("/user/update/:id", ControllerUser.updateUser)
routes.patch("/user/adress/update/:id", ControllerUser.updateAdress)
routes.delete("user/adress/delete", ControllerUser.deleteAdress)



export default routes;