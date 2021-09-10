import SignUpController from './signup';
import {
  EmailValidator,
  AddUser,
  UserModel,
  AddUserModel,
  MissingParamError,
  InvalidParamError,
  ServerError,
} from './signup-protocols';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addUserStub: AddUser;
}

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(addUser: AddUserModel): Promise<UserModel> {
      const { name, lastName, email, password } = addUser;
      const fakeUser = {
        id: 'any_id',
        name,
        lastName,
        email,
        password,
      };
      return new Promise((resolve) => resolve(fakeUser));
    }
  }

  return new AddUserStub();
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
  const addUserStub = makeAddUser();
  const sut = new SignUpController(emailValidatorStub, addUserStub);

  return { sut, emailValidatorStub, addUserStub };
};

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        lastName: 'any_lastName',
        email: 'test_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('should return 400 if no lastName is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'test_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('lastName'));
  });

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('should return 400 if no confirmPassword is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'));
  });

  test('should return 400 if confirmPassword not equal password', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('confirmPassword'));
  });

  test('should return 400 if no email valid is provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    emailValidatorStub.isValid(httpRequest.body.email);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, addUserStub } = makeSut();
    jest.spyOn(addUserStub, 'add').mockImplementation(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  test('should return 500 if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut();
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: {
        name: 'any_email',
        lastName: 'any_lastName',
        email: 'any_email@email.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should call addUser with correct values', async () => {
    const { sut, addUserStub } = makeSut();
    const addSpy = jest.spyOn(addUserStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_email',
        lastName: 'any_lastName',
        email: 'any_email@email.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_email',
      lastName: 'any_lastName',
      email: 'any_email@email.com',
      password: 'any_password',
    });
  });

  test('should return 200 if valid data provided', async () => {
    const { sut, addUserStub } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'valid_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    const { name, lastName, email, password } = httpRequest.body;
    addUserStub.add({
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
