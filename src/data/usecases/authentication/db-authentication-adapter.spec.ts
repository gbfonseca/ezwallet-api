import { FindUserByEmailRepository } from '../../protocols/find-user-by-email-repository';
import { UserModel } from '../user/db-add-user-adapter-protocols';
import { DbAuthenticationAdapter } from './db-authentication-adapter';
import { TokenGenerator } from '../../protocols/token-generator';
import { Decrypter } from '../../protocols/decrypter';

interface SutTypes {
  sut: DbAuthenticationAdapter;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
  decrypterAdapterStub: Decrypter;
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

const makeDecrypterAdapter = (): Decrypter => {
  class DecrypterAdapterStub implements Decrypter {
    async decrypt(password: string, passwordHash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new DecrypterAdapterStub();
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
  const decrypterAdapterStub = makeDecrypterAdapter();
  const sut = new DbAuthenticationAdapter(
    findUserByEmailRepositoryStub,
    decrypterAdapterStub,
    tokenGeneratorStub,
  );

  return {
    sut,
    findUserByEmailRepositoryStub,
    tokenGeneratorStub,
    decrypterAdapterStub,
  };
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

  test('should calls DecrypterAdapter with correct values', async () => {
    const { sut, decrypterAdapterStub } = makeSut();
    const decrypterSpy = jest.spyOn(decrypterAdapterStub, 'decrypt');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.checkCredentials(httpRequest.body);

    expect(decrypterSpy).toHaveBeenCalledWith(
      httpRequest.body.password,
      httpResponse.user.password,
    );
  });

  test('should return an error with password not equal decrypt password hashed', async () => {
    const { sut, decrypterAdapterStub } = makeSut();
    jest
      .spyOn(decrypterAdapterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = sut.checkCredentials(httpRequest.body);
    await expect(httpResponse).rejects.toThrow(
      'Email/Password values incorrect',
    );
  });

  test('should an user and token on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.checkCredentials(httpRequest.body);

    expect(httpResponse).toEqual({
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      token: 'any_token',
    });
  });
});
