import {
  Encrypter,
  AddAccountModel,
  AddAccountRepository,
  AccountModel,
} from './db-add-account-adapter.protocols';
import { DbAccountAdapter } from './db-add-account-adapter';

interface SutTypes {
  sut: DbAccountAdapter;
  encrypterAdapterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeAddAccountRepository = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(addAccount: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'any_id',
        name: 'valid_name',
        lastName: 'valid_lastName',
        email: 'valid_email@mail.com',
        password: 'hashed_password',
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositoryStub();
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
  const addAccountRepositoryStub = makeAddAccountRepository();
  const encrypterAdapterStub = makeEncrypterAdapter();
  const sut = new DbAccountAdapter(
    encrypterAdapterStub,
    addAccountRepositoryStub,
  );

  return { sut, encrypterAdapterStub, addAccountRepositoryStub };
};

describe('DbAccountAdapter Use case', () => {
  test('should calls DbAddAccountAdapter with correct values', async () => {
    const { sut } = makeSut();
    const addSpy = jest.spyOn(sut, 'add');
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith(accountData);
  });

  test('should calls encrypter with correct value', async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    const hashSpy = jest.spyOn(encrypterAdapterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(accountData);
    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should encrypter returns a hash on success', async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(accountData);
    const hashedPassword = await encrypterAdapterStub.encrypt(
      accountData.password,
    );
    expect(hashedPassword).toBe('hashed_password');
  });

  test('should DbAccountAdapter returns an account on success', async () => {
    const { sut } = makeSut();
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const account = await sut.add(accountData);

    expect(account).toEqual({
      id: 'any_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });
  });

  test('should DbAccountAdapter throws if encrypter throws', async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    jest
      .spyOn(encrypterAdapterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  test('should DbAccountAdapter throws if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });
});
