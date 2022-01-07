import { WalletModel } from '../../../../domain/models/wallet';
import {
  AddWallet,
  AddWalletModel,
} from '../../../../domain/usecases/wallet/add-wallet';
import { HttpRequest } from '../../../protocols';
import { UserModel } from '../../auth/signup/signup-protocols';
import { CreateWalletController } from './create-wallet';

interface SutTypes {
  sut: CreateWalletController;
  addWalletStub: AddWallet;
}

const makeAddWallet = (): AddWallet => {
  class AddWalletStub implements AddWalletStub {
    async add(
      addWallet: AddWalletModel,
      user: UserModel,
    ): Promise<WalletModel> {
      const fakeWallet: WalletModel = {
        id: 'any_id',
        name: 'Any Wallet Name',
        user: {
          id: 'any_id',
          name: 'any_name',
          lastName: 'any_lastName',
          email: 'any_email@mail.com',
          password: 'any_password',
        },
      };
      return new Promise((resolve) => resolve(fakeWallet));
    }
  }
  return new AddWalletStub();
};

const makeSut = (): SutTypes => {
  const addWalletStub = makeAddWallet();
  const sut = new CreateWalletController(addWalletStub);

  return { sut, addWalletStub };
};

describe('CreateWalletController', () => {
  it('should calls create wallet with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'handle');

    const httpRequest: HttpRequest = {
      body: {
        name: 'Any Wallet Name',
      },
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

  it('should return 400 if no wallet name provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        name: null,
      },
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  it('should return 500 if AddWallet throws', async () => {
    const { sut, addWalletStub } = makeSut();
    jest
      .spyOn(addWalletStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpRequest: HttpRequest = {
      body: {
        name: 'Any Wallet Name',
      },
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
});
