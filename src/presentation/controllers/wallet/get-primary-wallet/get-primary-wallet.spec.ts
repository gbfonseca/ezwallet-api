import {
  GetPrimaryWallet,
  GetPrimaryWalletController,
  WalletModel,
} from './get-primary-wallet-protocols';
import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
interface SutTypes {
  sut: GetPrimaryWalletController;
  getPrimaryWalletStub: GetPrimaryWallet;
}

const makeGetPrimaryWallet = (): GetPrimaryWallet => {
  class GetPrimaryWalletStub implements GetPrimaryWallet {
    async getPrimary(userId: string): Promise<WalletModel> {
      return new Promise((resolve) => resolve(fakeWalletCreated));
    }
  }

  return new GetPrimaryWalletStub();
};

const makeSut = (): SutTypes => {
  const getPrimaryWalletStub = makeGetPrimaryWallet();
  const sut = new GetPrimaryWalletController(getPrimaryWalletStub);

  return { sut, getPrimaryWalletStub };
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

  it('should return 400 if no user provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      user: null,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  it('should return 500 if GetPrimaryWallet throws', async () => {
    const { sut, getPrimaryWalletStub } = makeSut();

    jest
      .spyOn(getPrimaryWalletStub, 'getPrimary')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
