import { FindUserByEmailRepository } from '../../protocols/find-user-by-email-repository';
import { UserModel } from '../user/db-add-user-adapter-protocols';
import { DbAuthenticationAdapter } from './db-authentication-adapter';
import { TokenGenerator } from '../../protocols/token-generator';

interface SutTypes {
  sut: DbAuthenticationAdapter;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
  tokenGeneratorStub: TokenGenerator;
}

const makeFindUserByEmailRepository = (): FindUserByEmailRepository => {
  class FindUserByEmailRepositoryStub implements FindUserByEmailRepository {
    async find(email: string): Promise<UserModel> {
      const fakeUser = {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      };

      return new Promise((resolve) => resolve(fakeUser));
    }
  }

  const findUserByEmailRepositoryStub = new FindUserByEmailRepositoryStub();

  return findUserByEmailRepositoryStub;
};

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'));
    }
  }

  return new TokenGeneratorStub();
};

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository();
  const tokenGeneratorStub = makeTokenGenerator();
  const sut = new DbAuthenticationAdapter(
    findUserByEmailRepositoryStub,
    tokenGeneratorStub,
  );

  return { sut, findUserByEmailRepositoryStub, tokenGeneratorStub };
};

describe('DbAuthentication Adapter', () => {
  test('should checkCredentials calls with correct values', async () => {
    const { sut } = makeSut();
    const dbAuthenticationAdapterSpy = jest.spyOn(sut, 'checkCredentials');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    await sut.checkCredentials(httpRequest.body);

    expect(dbAuthenticationAdapterSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('should throws if findUserByEmailRepository throws', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, 'find')
      .mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = sut.checkCredentials(httpRequest.body);

    await expect(httpResponse).rejects.toThrow();
  });

  test('should throws if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValue(new Promise((resolve, reject) => reject(new Error())));

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = sut.checkCredentials(httpRequest.body);

    await expect(httpResponse).rejects.toThrow();
  });
});
