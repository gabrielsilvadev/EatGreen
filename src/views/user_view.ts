import Adress from '../views/adress_view'
import User from '../models/user'
export default {
    render(user: User){
       return {
        id:user.id,
        name:user.name,
        sobrename:user.sobrename,
        cpf: user.cpf,
        tellephone: user.telephone,
        email:user.email,
        password:user.password,
        adress: Adress.renderMany(user.adress)
       };
    },
};