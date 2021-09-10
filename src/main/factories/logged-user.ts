import { LoggedUser } from '../../presentation/controllers/auth/logged-user/logged-user';

export const makeLoggedUserController = (): LoggedUser => {
  const loggedUser = new LoggedUser();

  return loggedUser;
};
