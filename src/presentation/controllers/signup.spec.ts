import { EmailValidator } from './../protocols/email-validator';
import { MissingParamError } from '../errors/missing-param-error';
import SignUpController from './signup';
import { InvalidParamError } from '../errors/invalid-param-error';
import { serverError } from '../helpers/http-helper';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return false;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(emailValidatorStub);

  return { sut, emailValidatorStub };
};

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        lastName: 'any_lastName',
        email: 'test_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('should return 400 if no lastName is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'test_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('lastName'));
  });

  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('should return 400 if no confirmPassword is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'));
  });

  test('should return 400 if no email valid is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    emailValidatorStub.isValid(httpRequest.body.email);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('should return 500 if handle throws', () => {
    const { sut } = makeSut();
    jest.spyOn(sut, 'handle').mockReturnValue(serverError());

    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});
