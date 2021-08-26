import {
  Encrypter,
  AddUserModel,
  AddUserRepository,
  UserModel,
} from './db-add-user-adapter-protocols';
import { DbUserAdapter } from './db-add-user-adapter';

interface SutTypes {
  sut: DbUserAdapter;
  encrypterAdapterStub: Encrypter;
  addUserRepositoryStub: AddUserRepository;
}

const makeAddUserRepository = () => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add(addUser: AddUserModel): Promise<UserModel> {
      const fakeUser = {
        id: 'any_id',
        name: 'valid_name',
        lastName: 'valid_lastName',
        email: 'valid_email@mail.com',
        password: 'hashed_password',
        created_at: new Date(),
        updated_at: new Date(),
      };
      return new Promise((resolve) => resolve(fakeUser));
    }
  }
  return new AddUserRepositoryStub();
};

const makeEncrypterAdapter = () => {
  class EncrypterAdapterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new EncrypterAdapterStub();
};

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository();
  const encrypterAdapterStub = makeEncrypterAdapter();
  const sut = new DbUserAdapter(encrypterAdapterStub, addUserRepositoryStub);

  return { sut, encrypterAdapterStub, addUserRepositoryStub };
};

describe('DbUserAdapter Use case', () => {
  test('should calls DbAddUserAdapter with correct values', async () => {
    const { sut } = makeSut();
    const addSpy = jest.spyOn(sut, 'add');
    const userData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(userData);

    expect(addSpy).toHaveBeenCalledWith(userData);
  });

  test('should calls encrypter with correct value', async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    const hashSpy = jest.spyOn(encrypterAdapterStub, 'encrypt');
    const userData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(userData);
    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should encrypter returns a hash on success', async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    const userData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(userData);
    const hashedPassword = await encrypterAdapterStub.encrypt(
      userData.password,
    );
    expect(hashedPassword).toBe('hashed_password');
  });

  test('should DbUserAdapter returns an user on success', async () => {
    const { sut } = makeSut();
    const userData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const user = await sut.add(userData);

    expect(user).toEqual({
      id: 'any_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
      created_at: new Date(),
      updated_at: new Date(),
    });
  });

  test('should DbUserAdapter throws if encrypter throws', async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    jest
      .spyOn(encrypterAdapterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const userData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const promise = sut.add(userData);

    await expect(promise).rejects.toThrow();
  });

  test('should DbUserAdapter throws if AddUserRepository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut();
    jest
      .spyOn(addUserRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const userData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const promise = sut.add(userData);

    await expect(promise).rejects.toThrow();
  });
});
