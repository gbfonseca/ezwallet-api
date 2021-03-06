import { UpdateUserModel } from '../../../../domain/usecases/update-user';
import { UserModel } from '../db-add-user-adapter/db-add-user-adapter-protocols';
import { UpdateUserRepository } from './../../../protocols/update-user-repository';
import { DbUpdateUserAdapter } from './db-update-user-adapter';
interface SutTypes {
  sut: DbUpdateUserAdapter;
  updateUserRepositoryStub: UpdateUserRepository;
}

const makeUpdateUserRepository = (): UpdateUserRepository => {
  class UpdateUserRepositoryStub implements UpdateUserRepository {
    async updateUser(
      user: UserModel,
      updateUser: UpdateUserModel,
    ): Promise<UserModel> {
      const fakeUpdatedUser = {
        id: 'any_id',
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      };

      return new Promise((resolve) => resolve(fakeUpdatedUser));
    }
  }

  return new UpdateUserRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateUserRepositoryStub = makeUpdateUserRepository();
  const sut = new DbUpdateUserAdapter(updateUserRepositoryStub);

  return { sut, updateUserRepositoryStub };
};

describe('DbUpdateUserAdapter', () => {
  it('should calls DbUpdateUserAdapter with correct values ', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'update');
    const request = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
      data: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    await sut.update(request.user, request.data);

    expect(sutSpy).toHaveBeenCalledWith(request.user, request.data);
  });

  it('should throws if UpdateUserRepository throws if UpdateUserRepository throws', async () => {
    const { sut, updateUserRepositoryStub } = makeSut();
    jest
      .spyOn(updateUserRepositoryStub, 'updateUser')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const request = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
      data: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const promise = sut.update(request.user, request.data);

    await expect(promise).rejects.toThrow();
  });

  it('should return an user on success', async () => {
    const { sut } = makeSut();

    const request = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
      },
      data: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const response = await sut.update(request.user, request.data);

    expect(response).toEqual({
      id: 'any_id',
      name: 'new_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });
});
