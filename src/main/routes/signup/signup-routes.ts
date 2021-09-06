import { adaptRoute } from './../../adapters/express-router-adapter';
import { Router } from 'express';
import { makeSignUpController } from '../../factories/signup';
export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
