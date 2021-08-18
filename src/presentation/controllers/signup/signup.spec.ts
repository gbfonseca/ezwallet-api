import SignUpController from './signup';
import { EmailValidator } from './signup-protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { serverError } from '../../helpers';
import { AccountModel, AddAccountModel } from '../../../domain/models/account';
import { AddAccount } from '../../../domain/protocols';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(addAccount: AddAccountModel): AccountModel {
      const { name, lastName, email, password } = addAccount;
      return {
        id: 'any_id',
        name,
        lastName,
        email,
        password,
      };
    }
  }

  return new AddAccountStub();
};

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);

  return { sut, emailValidatorStub, addAccountStub };
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

  test('should return 400 if confirmPassword not equal password', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'wrong_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('confirmPassword'));
  });

  test('should return 400 if no email valid is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
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
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  test('should return 200 if valid data provided', () => {
    const { sut, addAccountStub } = makeSut();
    // jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {})
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'valid_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    const { name, lastName, email, password } = httpRequest.body;
    addAccountStub.add({
      name,
      lastName,
      email,
      password,
    });
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'any_id',
      name,
      lastName,
      email,
      password,
    });
  });
});
