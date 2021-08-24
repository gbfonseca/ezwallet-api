import { BcryptAdapter } from './bcrypt-adapter';
import bcrypt from 'bcrypt';

const salt = 12;

jest.mock('bcrypt', () => ({
  hash(data: string) {
    return 'hash_value';
  },
}));

describe('BcryptAdapter', () => {
  test('should return a hash if data is correct', async () => {
    const sut = new BcryptAdapter(salt);
    const password = 'any_password';
    const hash = await sut.encrypt(password);
    expect(hash).toBe('hash_value');
  });

  test('should BcryptAdapter calls bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(sut, 'encrypt');
    const password = 'any_password';
    await sut.encrypt(password);
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  test('should BcryptAdapter throws if bcrypt throw', async () => {
    const sut = new BcryptAdapter(salt);
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error())),
      );
    const password = 'any_password';
    const promise = sut.encrypt(password);
    await expect(promise).rejects.toThrow();
  });
});
