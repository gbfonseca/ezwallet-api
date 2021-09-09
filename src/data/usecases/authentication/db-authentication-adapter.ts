import { FindUserByEmailRepository } from './../../protocols/find-user-by-email-repository';
import {
  AuthenticatedUser,
  Authentication,
  Credentials,
} from '../../../domain/usecases/authentication';
import { TokenGenerator } from '../../protocols/token-generator';
import { Encrypter } from '../../protocols/encrypter';

export class DbAuthenticationAdapter implements Authentication {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly encrypter: Encrypter,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async checkCredentials(credentials: Credentials): Promise<AuthenticatedUser> {
    const { email, password } = credentials;
    const user = await this.findUserByEmailRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email/Password values incorrect');
    }

    const matchedPassword = await this.encrypter.decrypt(
      password,
      user.password,
    );

    if (!matchedPassword) {
      throw new Error('Email/Password values incorrect');
    }

    const token = await this.tokenGenerator.generate(user.id);
    return {
      user,
      token,
    };
  }
}
