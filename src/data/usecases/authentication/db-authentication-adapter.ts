import { FindUserByEmailRepository } from './../../protocols/find-user-by-email-repository';
import {
  AuthenticatedUser,
  Authentication,
  Credentials,
} from '../../../domain/usecases/authentication';

export class DbAuthenticationAdapter implements Authentication {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async checkCredentials(credentials: Credentials): Promise<AuthenticatedUser> {
    const { email } = credentials;
    const user = await this.findUserByEmailRepository.find(email);
    return {
      user,
      token: 'any_token',
    };
  }
}
