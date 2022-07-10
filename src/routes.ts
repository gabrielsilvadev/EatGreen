import { Router } from 'express';
import userRouters from './routers/users/UserRouters';
import companyRouters from './routers/company/CompanyRouters';
import productRouters from './routers/product/ProductRouters';
import orderRouters from './routers/order/OrderRouters';
import adressRouters from './routers/adress/RouterAdress';
const routes = Router();
routes.use('/user', userRouters)
routes.use('/company', companyRouters)
routes.use('/products', productRouters)
routes.use('/order', orderRouters)
routes.use('/adress',adressRouters)


export default routes;
