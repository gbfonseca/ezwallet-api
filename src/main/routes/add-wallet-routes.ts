import { Router } from 'express';
import { makeAddWallet } from '../factories/add-wallet';
import authenticatedRoute from '../middlewares/authenticated-route';
import { adaptRoute } from './../adapters/express-router-adapter';
export default (router: Router): void => {
  router.post(
    '/wallet/create',
    authenticatedRoute,
    adaptRoute(makeAddWallet()),
  );
};
