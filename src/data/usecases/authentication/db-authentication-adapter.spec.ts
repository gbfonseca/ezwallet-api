import { FindUserByEmailRepository } from '../../protocols/find-user-by-email-repository';
import { UserModel } from '../user/db-add-user-adapter-protocols';
import { DbAuthenticationAdapter } from './db-authentication-adapter';

interface SutTypes {
  sut: DbAuthenticationAdapter;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
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

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository();
  const sut = new DbAuthenticationAdapter(findUserByEmailRepositoryStub);

  return { sut, findUserByEmailRepositoryStub };
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
});
