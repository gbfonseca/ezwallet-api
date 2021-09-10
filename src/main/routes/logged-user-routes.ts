import { Router } from 'express';
import { makeLoggedUserController } from '../factories/logged-user';
import authenticatedRoute from '../middlewares/authenticated-route';
import { adaptRoute } from './../adapters/express-router-adapter';
export default (router: Router): void => {
  router.get(
    '/auth/logged-user',
    authenticatedRoute,
    adaptRoute(makeLoggedUserController()),
  );
};
