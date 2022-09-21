import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const adressRouters = Router()
const adressController = new controller.AdressController

adressRouters.post("/create",isAuthenticated, adressController.create)
adressRouters.patch("/save/:id",isAuthenticated , adressController.update)
adressRouters.delete("/delete/:id",isAuthenticated, adressController.delete)
adressRouters.get("/", isAuthenticated, adressController.find)


export default adressRouters
