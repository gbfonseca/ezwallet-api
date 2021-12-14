import UpdateUserController from './update-user';

interface SutTypes {
  sut: UpdateUserController;
}

const makeSut = (): SutTypes => {
  const sut = new UpdateUserController();

  return { sut };
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
});
