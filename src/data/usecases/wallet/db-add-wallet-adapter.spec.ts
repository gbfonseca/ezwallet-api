import { UserModel } from '../../../domain/models/user';
import { WalletModel } from '../../../domain/models/wallet';
import { AddWalletModel } from '../../../domain/usecases/wallet/add-wallet';
import { AddWalletRepository } from '../../protocols/add-wallet-repository';
import { DbAddWalletAdapter } from './db-add-wallet-adapter';

interface SutTypes {
  sut: DbAddWalletAdapter;
  addWalletRepositoryStub: AddWalletRepository;
}

const makeAddWalletRepository = (): AddWalletRepository => {
  class AddWalletRepositoryStub implements AddWalletRepository {
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

  return new AddWalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addWalletRepositoryStub = makeAddWalletRepository();
  const sut = new DbAddWalletAdapter(addWalletRepositoryStub);

  return { sut, addWalletRepositoryStub };
};

describe('DbAddWalletAdapter', () => {
  it('should calls DbAddWalletApdater with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'add');
    const addWallet = {
      name: 'Any Wallet Name',
    };

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    };

    await sut.add(addWallet, user);

    expect(sutSpy).toBeCalledWith(addWallet, user);
  });

  it('should throws if AddWalletRepository throws', async () => {
    const { sut, addWalletRepositoryStub } = makeSut();
    jest
      .spyOn(addWalletRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const addWallet = {
      name: 'Any Wallet Name',
    };

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    };

    const promise = sut.add(addWallet, user);

    await expect(promise).rejects.toThrow();
  });
});
