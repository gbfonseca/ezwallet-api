import { UserTypeormRepository } from './../../infra/db/typeorm/repositories/user/user';
import { DbAddUserAdapter } from './../../data/usecases/user/db-add-user-adapter';
import { BcryptAdapter } from './../../infra/cryptography/bcrypt-adapter';
import SignUpController from '../../presentation/controllers/auth/signup/signup';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter/email-validator-adapter';

export const makeSignUpController = (): SignUpController => {
  const SALT = 12;
  const bcryptAdapter = new BcryptAdapter(SALT);
  const userTypeormRepository = new UserTypeormRepository();
  const emailValidator = new EmailValidatorAdapter();
  const dbAddUserAdapter = new DbAddUserAdapter(
    bcryptAdapter,
    userTypeormRepository,
  );
  const signUpController = new SignUpController(
    emailValidator,
    dbAddUserAdapter,
  );

  return signUpController;
};
