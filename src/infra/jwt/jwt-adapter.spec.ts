import { JwtAdapter } from './jwt-adapter';
const makeSut = (): JwtAdapter => {
  return new JwtAdapter();
};

describe('JWT Adapter', () => {
  test('should return an token on success', async () => {
    const sut = makeSut();

    const userId = 'any_id';

    const token = await sut.generate(userId);

    expect(token).toBeTruthy();
  });
});
