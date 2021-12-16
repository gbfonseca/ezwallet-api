import { EmailValidatorAdapter } from './../../utils/EmailValidatorAdapter/email-validator-adapter';
import { UserTypeormRepository } from './../../infra/db/typeorm/repositories/user/user';
import { DbUpdateUserAdapter } from './../../data/usecases/user/db-update-user-adapter/db-update-user-adapter';
import { UpdateUserController } from './../../presentation/controllers/user/update-user/update-user';

export const makeUpdateUserController = (): UpdateUserController => {
  const userRepository = new UserTypeormRepository();
  const updateuser = new DbUpdateUserAdapter(userRepository);
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const updateUserController = new UpdateUserController(
    updateuser,
    emailValidatorAdapter,
  );
  return updateUserController;
};
