import { WalletModel } from '../create-wallet/create-wallet-protocols';
import { FindWalletController } from './find-wallet';
import { FindWalletsByUserId } from '../../../../domain/usecases/wallet/find-wallets-by-user-id';
import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
interface SutTypes {
  sut: FindWalletController;
  findWalletsByUserIdStub: FindWalletsByUserId;
}

const makeFindWalletsByUserId = (): FindWalletsByUserId => {
  class FindWalletsByUserIdStub implements FindWalletsByUserId {
    async find(id: string): Promise<WalletModel[]> {
      return new Promise((resolve) => resolve([fakeWalletCreated]));
    }
  }

  return new FindWalletsByUserIdStub();
};

const makeSut = (): SutTypes => {
  const findWalletsByUserIdStub = makeFindWalletsByUserId();
  const sut = new FindWalletController(findWalletsByUserIdStub);

  return { sut, findWalletsByUserIdStub };
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
  it('should return 400 if invalid user provided on request', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      user: null,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  it('should return 500 if FindWalletsByUserId throws', async () => {
    const { sut, findWalletsByUserIdStub } = makeSut();

    jest
      .spyOn(findWalletsByUserIdStub, 'find')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error())),
      );

    const httpRequest = {
      user: {
        id: 'any_id',
        email: 'any_email@mail.com',
        name: 'any_name',
        lastName: 'any_lastName',
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
        email: 'any_email@mail.com',
        name: 'any_name',
        lastName: 'any_lastName',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
