import { MissingParamError } from './../../errors/missing-param-error';
import { SignInController } from './signin';
const makeSut = (): SignInController => {
  const sut = new SignInController();

  return sut;
};

describe('SignIn Controller', () => {
  test('should returns 400 if not password is provided', async () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
  test('should returns 400 if not email is provided', async () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });
});
