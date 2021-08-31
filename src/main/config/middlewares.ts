import { bodyParser } from './../middlewares/body-parser';
import { Express } from 'express';
import { contentType } from '../middlewares/content-type';
import { cors } from '../middlewares/cors';
export default (app: Express): void => {
  app.use(bodyParser);
  app.use(contentType);
  app.use(cors);
};
