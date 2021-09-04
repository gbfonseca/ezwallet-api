import {
  AuthenticatedUser,
  Authentication,
  Credentials,
} from '../../../domain/usecases/authentication';

export class DbAuthenticationAdapter implements Authentication {
  async checkCredentials(credentials: Credentials): Promise<AuthenticatedUser> {
    return new Promise((resolve) => resolve(null));
  }
}
