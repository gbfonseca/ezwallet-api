import { BcryptAdapter } from './../../infra/cryptography/bcrypt-adapter';
import { UserTypeormRepository } from './../../infra/db/typeorm/repositories/user/user';
import { DbAuthenticationAdapter } from './../../data/usecases/authentication/db-authentication-adapter';
import { EmailValidatorAdapter } from './../../utils/EmailValidatorAdapter/email-validator-adapter';
import { SignInController } from '../../presentation/controllers/auth/signin/signin';
import { JwtAdapter } from '../../infra/jwt/jwt-adapter';
export const makeSignInController = (): SignInController => {
  const SALT = 12;
  const emailValidator = new EmailValidatorAdapter();
  const userTypeormRepository = new UserTypeormRepository();
  const bcryptAdapter = new BcryptAdapter(SALT);
  const jwtAdapter = new JwtAdapter();
  const dbAuthentication = new DbAuthenticationAdapter(
    userTypeormRepository,
    bcryptAdapter,
    jwtAdapter,
  );
  const signInController = new SignInController(
    emailValidator,
    dbAuthentication,
  );

  return signInController;
};
