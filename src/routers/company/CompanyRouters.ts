import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const companyRouters = Router()
const companyController = new controller.CompanyController

companyRouters.post("/create", companyController.create)
companyRouters.patch("/save",isAuthenticated , companyController.update)
companyRouters.post("/auth", companyController.auth)
companyRouters.post("/forgot", companyController.forgot)
companyRouters.post("resetPassword", companyController.resetPassword)

export default companyRouters
