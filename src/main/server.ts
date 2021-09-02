import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { TypeormHelper } from '../infra/db/typeorm/helpers/typeorm-helper';
import app from './config/app';
import env from './config/env';
const { database } = env;
TypeormHelper.connect(database as ConnectionOptions)
  .then(() => {
    app.listen(env.port, () =>
      console.log(`Server running on http://localhost:${env.port}`),
    );
  })
  .catch(console.error);
