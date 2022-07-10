import express from 'express';
import './database/conection';
import 'express-async-errors'
import bodyParser  from 'body-parser'
import routes from './routes';
import cors from 'cors'
import errosHandler from './errors/handler';
const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes);
/*app.use('/uploads',express.static(path.join(__dirname,'...','/uploads')))*/
app.use(errosHandler)
app.listen(3333);
