import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const adressRouters = Router()
const adressController = new controller.AdressController

adressRouters.post("/create", adressController.create)
adressRouters.patch("/save/:id",isAuthenticated , adressController.update)
adressRouters.post("/delete/:id", adressController.delete)


export default adressRouters
