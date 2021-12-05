import { SignInController } from './signin';
import { EmailValidator } from './../../../protocols/email-validator';
import {
  MissingParamError,
  InvalidParamError,
  AuthenticatedUser,
  Authentication,
  Credentials,
} from './signin-protocols';
import { NotFoundDataError } from '../signup/signup-protocols';

interface SutTypes {
  sut: SignInController;
  emailValidatorStub: EmailValidator;
  authenticationStub: Authentication;
}

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async checkCredentials(
      credentials: Credentials,
    ): Promise<AuthenticatedUser> {
      const { email, password } = credentials;
      const fakeUser = {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email,
        password,
      };
      const fakeToken = 'any_token';
      return {
        user: fakeUser,
        token: fakeToken,
      };
    }
  }
  const authentication = new AuthenticationStub();

  return authentication;
};

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidator = new EmailValidatorStub();
  return emailValidator;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub();
  const authenticationStub = makeAuthenticationStub();
  const sut = new SignInController(emailValidatorStub, authenticationStub);
  return { sut, emailValidatorStub, authenticationStub };
};

describe('SignIn Controller', () => {
  test('should returns 400 if not password is provided', async () => {
    const { sut } = makeSut();

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
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should returns 400 if invalid email provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('should returns 404 no user found', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'checkCredentials')
      .mockReturnValueOnce(
        new Promise((resolve, reject) =>
          reject(new Error('E-mail/Senha incorretos.')),
        ),
      );
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual(
      new NotFoundDataError('E-mail/Senha incorretos.'),
    );
  });

  test('should returns 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  test('should calls EmailValidator with correct data', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(emailValidatorSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  test('should calls Authentication with correct data', async () => {
    const { sut, authenticationStub } = makeSut();
    const authenticationSpy = jest.spyOn(
      authenticationStub,
      'checkCredentials',
    );
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(authenticationSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('should returns 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'checkCredentials')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  test('should returns User and Token with success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      token: 'any_token',
    });
  });
});
