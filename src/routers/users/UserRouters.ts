import { Router } from 'express'
import controller from '../../controller'
import isAuthenticated  from "../../middleware/alphaUser"
const userRouters = Router()
const userController = new controller.UserController()

userRouters.post("/create", userController.create)
userRouters.patch("/save",isAuthenticated , userController.save)
userRouters.get("/validation", isAuthenticated, userController.validation)
userRouters.post("/auth", userController.auth)
userRouters.post("/forgot", userController.forgot)
userRouters.post("/resetPassword", userController.resetPassword)

export default userRouters
