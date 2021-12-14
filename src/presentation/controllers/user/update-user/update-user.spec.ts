import { EmailValidator } from './../../../protocols/email-validator';
import { UserModel } from '../../../../domain/models/user';
import {
  UpdateUser,
  UpdateUserModel,
} from './../../../../domain/usecases/update-user';
import UpdateUserController from './update-user';

interface SutTypes {
  sut: UpdateUserController;
  updateUserStub: UpdateUser;
  emailValidatorStub: EmailValidator;
}

const makeUpdateUser = (): UpdateUser => {
  class UpdateUserStub implements UpdateUser {
    update(data: UpdateUserModel): Promise<UserModel> {
      const fakeUser = {
        id: 'any_id',
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      };

      return new Promise((resolve) => resolve(fakeUser));
    }
  }

  return new UpdateUserStub();
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
  const updateUserStub = makeUpdateUser();
  const sut = new UpdateUserController(updateUserStub, emailValidatorStub);

  return { sut, updateUserStub, emailValidatorStub };
};

describe('Update User Controller', () => {
  it('should calls UpdateUserController with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'handle');
    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      body: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });
  it('should return 400 if invalid user provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      user: null,
      body: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
  it('should return 500 if updateUser throws', async () => {
    const { sut, updateUserStub } = makeSut();
    jest
      .spyOn(updateUserStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error(''))),
      );
    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      body: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it('should return 500 if emailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      body: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });
  it('should return 400 if invalid email provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      body: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
      body: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.name).toBe('new_name');
  });
});
