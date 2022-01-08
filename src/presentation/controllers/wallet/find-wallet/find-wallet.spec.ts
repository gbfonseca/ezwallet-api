import { FindWalletController } from './find-wallet';

interface SutTypes {
  sut: FindWalletController;
}

const makeSut = (): SutTypes => {
  const sut = new FindWalletController();

  return { sut };
};

describe('FindWallet Controller', () => {
  it('should calls FindWalletController with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'handle');
    const httpRequest = {
      user: {
        id: 'any_id',
        email: 'any_email@mail.com',
        name: 'any_name',
        lastName: 'any_lastName',
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });
});
