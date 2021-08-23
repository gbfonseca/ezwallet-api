import { Encrypter } from '../../protocols/encrypter';
import { DbAccountAdapter } from './db-add-account-adapter';

describe('DbAccountAdapter Use case', () => {
  test('should calls DbAddAccountAdapter with correct values', async () => {
    class EncrypterAdapterStub implements Encrypter {
      async hash(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'));
      }
    }
    const encrypterAdapterStub = new EncrypterAdapterStub();
    const sut = new DbAccountAdapter(encrypterAdapterStub);
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
});
