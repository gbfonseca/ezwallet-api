import { Router } from 'express';
import { makeFindWalletsByUserIdAdapter } from '../factories/find-wallets-by-user-id';
import authenticatedRoute from '../middlewares/authenticated-route';
import { adaptRoute } from './../adapters/express-router-adapter';
export default (router: Router): void => {
  router.get(
    '/wallet/find-all',
    authenticatedRoute,
    adaptRoute(makeFindWalletsByUserIdAdapter()),
  );
};
