import { DbAuthenticationAdapter } from './db-authentication-adapter';
const makeSut = (): DbAuthenticationAdapter => {
  const sut = new DbAuthenticationAdapter();

  return sut;
};

describe('DbAuthentication Adapter', () => {
  test('should checkCredentials calls with correct values', async () => {
    const sut = makeSut();
    const dbAuthenticationAdapterSpy = jest.spyOn(sut, 'checkCredentials');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    await sut.checkCredentials(httpRequest.body);

    expect(dbAuthenticationAdapterSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });
});
