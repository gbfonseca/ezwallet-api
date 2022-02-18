import { Router } from 'express';
import { makeGetPrimaryWallet } from '../factories/get-primary-wallet';
import authenticatedRoute from '../middlewares/authenticated-route';
import { adaptRoute } from './../adapters/express-router-adapter';
export default (router: Router): void => {
  router.get(
    '/wallet/get-primary',
    authenticatedRoute,
    adaptRoute(makeGetPrimaryWallet()),
  );
};
