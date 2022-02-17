import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
import {
  HttpRequest,
  WalletModel,
  SetPrimaryWallet,
  SetPrimaryWalletController,
} from './set-wallet-protocols';

interface SutTypes {
  sut: SetPrimaryWalletController;
  setPrimaryWalletStub: SetPrimaryWallet;
}

const makeSetPrimaryWallet = (): SetPrimaryWallet => {
  class SetPrimaryWalletStub implements SetPrimaryWallet {
    setPrimary(walletId: string): Promise<WalletModel> {
      return new Promise((resolve) => resolve(fakeWalletCreated));
    }
  }

  return new SetPrimaryWalletStub();
};

const makeSut = (): SutTypes => {
  const setPrimaryWalletStub = makeSetPrimaryWallet();
  const sut = new SetPrimaryWalletController(setPrimaryWalletStub);

  return { sut, setPrimaryWalletStub };
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

  it('should return 500 if SetPrimaryWallet throws', async () => {
    const { sut, setPrimaryWalletStub } = makeSut();

    jest
      .spyOn(setPrimaryWalletStub, 'setPrimary')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
