import { FindUserByEmailRepository } from './../../protocols/find-user-by-email-repository';
import {
  AuthenticatedUser,
  Authentication,
  Credentials,
} from '../../../domain/usecases/authentication';
import { TokenGenerator } from '../../protocols/token-generator';
import { Decrypter } from '../../protocols/decrypter';

export class DbAuthenticationAdapter implements Authentication {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly decrypter: Decrypter,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async checkCredentials(credentials: Credentials): Promise<AuthenticatedUser> {
    const { email, password } = credentials;
    const user = await this.findUserByEmailRepository.find(email);

    await this.decrypter.decrypt(password, user.password);

    const token = await this.tokenGenerator.generate(user.id);
    return {
      user,
      token,
    };
  }
}
