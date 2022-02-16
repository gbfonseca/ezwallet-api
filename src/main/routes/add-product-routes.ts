import { Router } from 'express';
import { makeAddProduct } from '../factories/add-product';
import authenticatedRoute from '../middlewares/authenticated-route';
import { adaptRoute } from './../adapters/express-router-adapter';
export default (router: Router): void => {
  router.post(
    '/product/:walletId/add',
    authenticatedRoute,
    adaptRoute(makeAddProduct()),
  );
};
