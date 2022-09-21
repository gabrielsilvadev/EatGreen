import CreateUserService from './create'
import SaveUserService from "./save"
import AuthUserService from "./auth"
import ForgotUserSevice from "./forgot"
import ResetPasswordUserService from "./resetPassword"
import FindService from './find'
const services = {
  CreateUserService,
  SaveUserService,
  FindService,
  AuthUserService,
  ForgotUserSevice,
  ResetPasswordUserService
}

export default services
