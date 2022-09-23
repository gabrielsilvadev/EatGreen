import express from 'express';
import './database/conection';
import 'express-async-errors'
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log('Running on host: http://localhost:' + PORT);
});
