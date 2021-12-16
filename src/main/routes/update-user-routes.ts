import { makeUpdateUserController } from './../factories/update-user';
import { adaptRoute } from './../adapters/express-router-adapter';
import { Router } from 'express';
import authenticatedRoute from '../middlewares/authenticated-route';

export default (router: Router): void => {
  router.put(
    '/user/update',
    authenticatedRoute,
    adaptRoute(makeUpdateUserController()),
  );
};
