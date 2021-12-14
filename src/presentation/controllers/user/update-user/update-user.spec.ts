import { UserModel } from '../../../../domain/models/user';
import {
  UpdateUser,
  UpdateUserModel,
} from './../../../../domain/usecases/update-user';
import UpdateUserController from './update-user';

interface SutTypes {
  sut: UpdateUserController;
  updateUserStub: UpdateUser;
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

const makeSut = (): SutTypes => {
  const updateUserStub = makeUpdateUser();
  const sut = new UpdateUserController(updateUserStub);

  return { sut, updateUserStub };
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
});
