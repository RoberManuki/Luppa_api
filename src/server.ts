import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload';
import './database';

const port = 3333;
const app = express();

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.listen(port, () => {
  console.log(`Serv started on port: ${port}`);
});
