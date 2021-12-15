import { DbUpdateUserAdapter } from './db-update-user-adapter';
interface SutTypes {
  sut: DbUpdateUserAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new DbUpdateUserAdapter();

  return { sut };
};

describe('DbUpdateUserAdapter', () => {
  it('should calls DbUpdateUserAdapter with correct values ', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'update');
    const request = {
      id: 'any_id',
      data: {
        name: 'new_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    await sut.update(request.id, request.data);

    expect(sutSpy).toHaveBeenCalledWith(request.id, request.data);
  });
});
