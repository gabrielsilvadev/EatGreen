import express from 'express';
import './database/conection';
import 'express-async-errors'
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.listen(3333, () => {
  console.log('Running on host: http://localhost:3333');
});
