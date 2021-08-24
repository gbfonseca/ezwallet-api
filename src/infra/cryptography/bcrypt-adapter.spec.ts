import { BcryptAdapter } from './bcrypt-adapter';
// import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash(data: string) {
    return 'hash_value';
  },
}));

describe('BcryptAdapter', () => {
  test('should return a hash if data is correct', async () => {
    const sut = new BcryptAdapter();
    const password = 'any_password';
    const hash = await sut.encrypt(password);
    expect(hash).toBe('hash_value');
  });
});
