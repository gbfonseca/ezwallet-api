import { Router } from 'express';
import { makeSetPrimaryWallet } from '../factories/set-primary-wallet';
import authenticatedRoute from '../middlewares/authenticated-route';
import { adaptRoute } from './../adapters/express-router-adapter';
export default (router: Router): void => {
  router.put(
    '/wallet/:walletId/set-primary',
    authenticatedRoute,
    adaptRoute(makeSetPrimaryWallet()),
  );
};
