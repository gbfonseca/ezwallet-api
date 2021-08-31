import { bodyParser } from './../middlewares/body-paser/body-parser';
import { Express } from 'express';
export default (app: Express): void => {
  app.use(bodyParser);
};
