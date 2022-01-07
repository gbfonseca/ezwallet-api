import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { TypeormHelper } from '../infra/db/typeorm/helpers/typeorm-helper';
import env from './config/env';
import app from './config/app';
import setupMiddlewares from './config/middlewares';
import setupRoutes from './config/routes';

const { database } = env;
TypeormHelper.connect(database as ConnectionOptions)
  .then(() => {
    setupMiddlewares(app);
    setupRoutes(app);
    app.listen(env.port, () =>
      console.log(`Server running on http://localhost:${env.port}`),
    );
  })
  .catch(console.error);
