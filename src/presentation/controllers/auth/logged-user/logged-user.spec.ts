import { LoggedUser } from './logged-user';

const makeSut = (): LoggedUser => {
  const sut = new LoggedUser();

  return sut;
};

describe('LoggedUser Controller', () => {
  test('should calls LoggedUser with correct values', async () => {
    const sut = makeSut();

    const sutSpy = jest.spyOn(sut, 'handle');

    const httpRequest = {
      body: {},
      headers: {
        Authorization: 'Bearer token',
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('should returns 400 if no token provided', async () => {
    const sut = makeSut();

    const httpRequest = {
      body: {},
      headers: {},
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
