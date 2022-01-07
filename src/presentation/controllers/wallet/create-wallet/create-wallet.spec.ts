import { CreateWalletController } from './create-wallet';

interface SutTypes {
  sut: CreateWalletController;
}

const makeSut = (): SutTypes => {
  const sut = new CreateWalletController();

  return { sut };
};

describe('CreateWalletController', () => {
  it('should calls create wallet with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'handle');

    const httpRequest = {};

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });
});
