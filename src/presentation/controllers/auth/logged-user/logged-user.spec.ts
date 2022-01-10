import { HttpRequest } from './../../../protocols/http';
import { serverError } from '../../../helpers/http-helper';
import { LoggedUser } from './logged-user';

const makeSut = (): LoggedUser => {
  const sut = new LoggedUser();

  return sut;
};

describe('LoggedUser Controller', () => {
  test('should calls LoggedUser with correct values', async () => {
    const sut = makeSut();

    const sutSpy = jest.spyOn(sut, 'handle');

    const httpRequest: HttpRequest = {
      body: {},
      headers: {
        authorization: 'Bearer token',
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('should returns 400 if no token provided', async () => {
    const sut = makeSut();

    const httpRequest: HttpRequest = {
      body: {},
      headers: {},
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should returns 500 if LoggedUser throws', async () => {
    const sut = makeSut();
    jest.spyOn(sut, 'handle').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest: HttpRequest = {
      body: {},
      headers: {},
    };

    const httpResponse = sut.handle(httpRequest);

    await expect(httpResponse).rejects.toThrow();
  });

  test('should returns 404 if user not found', async () => {
    const sut = makeSut();

    const httpRequest: HttpRequest = {
      body: {},
      headers: {
        authorization: 'Bearer token',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
  });

  test('should returns an user on success', async () => {
    const sut = makeSut();

    const httpRequest: HttpRequest = {
      body: {},
      headers: {
        authorization: 'Bearer token',
      },
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.id).toBeTruthy();
    expect(httpResponse.body.name).toBeTruthy();
    expect(httpResponse.body.lastName).toBeTruthy();
    expect(httpResponse.body.email).toBeTruthy();
    expect(httpResponse.body.password).toBeTruthy();
  });
});
