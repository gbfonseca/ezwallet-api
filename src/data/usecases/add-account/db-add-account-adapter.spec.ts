import { Encrypter } from './../../protocols/encrypter';
import { DbAccountAdapter } from './db-add-account-adapter';

interface SutTypes {
  sut: DbAccountAdapter;
  encrypterAdapterStub: Encrypter;
}

const makeEncrypterAdapter = () => {
  class EncrypterAdapterStub implements Encrypter {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new EncrypterAdapterStub();
};

const makeSut = (): SutTypes => {
  const encrypterAdapterStub = makeEncrypterAdapter();
  const sut = new DbAccountAdapter(encrypterAdapterStub);

  return { sut, encrypterAdapterStub };
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
    const hashSpy = jest.spyOn(encrypterAdapterStub, 'hash');
    const accountData = {
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(accountData);
    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });
});
