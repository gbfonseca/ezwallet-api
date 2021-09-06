import jwt from 'jsonwebtoken';
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

  test('should throws if jsonwebtoken throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    const userId = 'any_id';

    const token = sut.generate(userId);

    await expect(token).rejects.toThrow();
  });

  test('should calls jsonwebtoken with correct values', async () => {
    const sut = makeSut();
    const jwtSpy = jest.spyOn(jwt, 'sign');
    const userId = 'any_id';

    await sut.generate(userId);

    expect(jwtSpy).toHaveBeenCalledWith(
      { id: userId },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d',
      },
    );
  });
});
