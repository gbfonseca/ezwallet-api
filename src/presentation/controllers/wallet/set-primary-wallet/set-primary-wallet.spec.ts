import { HttpRequest } from '../../../protocols/http';
import { SetPrimaryWalletController } from './set-primary-wallet';

interface SutTypes {
  sut: SetPrimaryWalletController;
}

const makeSut = (): SutTypes => {
  const sut = new SetPrimaryWalletController();

  return { sut };
};

describe('SetPrimaryWallet Controller', () => {
  it('should calls handle with correct values', async () => {
    const { sut } = makeSut();

    const sutSpy = jest.spyOn(sut, 'handle');

    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('should return 400 if no walletId provided', async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      params: {},
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
