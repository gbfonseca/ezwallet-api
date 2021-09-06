import { BcryptAdapter } from './bcrypt-adapter';
import bcrypt from 'bcrypt';

const salt = 12;

jest.mock('bcrypt', () => ({
  hash(data: string) {
    return 'hash_value';
  },

  compare(value: string, valueHashed: string) {
    return true;
  },
}));

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('BcryptAdapter', () => {
  test('should return a hash if data is correct', async () => {
    const sut = makeSut();
    const password = 'any_password';
    const hash = await sut.encrypt(password);
    expect(hash).toBe('hash_value');
  });

  test('should BcryptAdapter calls bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(sut, 'encrypt');
    const password = 'any_password';
    await sut.encrypt(password);
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  test('should BcryptAdapter throws if bcrypt throw', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error())),
      );
    const password = 'any_password';
    const promise = sut.encrypt(password);
    await expect(promise).rejects.toThrow();
  });

  test('should BcryptAdapter returns true if password matched', async () => {
    const sut = makeSut();

    const password = 'any_password';
    const hashedPassword = 'hashed_password';

    const matchedPassword = await sut.decrypt(password, hashedPassword);

    expect(matchedPassword).toBe(true);
  });
});
