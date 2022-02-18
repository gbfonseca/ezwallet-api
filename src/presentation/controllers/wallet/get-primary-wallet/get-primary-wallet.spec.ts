import { GetPrimaryWalletController } from './get-primary-wallet';

interface SutTypes {
  sut: GetPrimaryWalletController;
}

const makeSut = (): SutTypes => {
  const sut = new GetPrimaryWalletController();

  return { sut };
};

describe('GetPrimaryWallet Controller', () => {
  it('should calls GetPrimaryWalletController with correct values', async () => {
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
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });
});
