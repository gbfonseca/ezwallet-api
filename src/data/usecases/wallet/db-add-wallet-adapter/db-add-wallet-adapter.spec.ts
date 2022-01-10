import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
import { DbAddWalletAdapter } from './db-add-wallet-adapter';
import {
  UserModel,
  WalletModel,
  AddWalletModel,
  AddWalletRepository,
} from './db-add-wallet-protocols';

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
      return new Promise((resolve) => resolve(fakeWalletCreated));
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

  it('should return an wallet on success', async () => {
    const { sut } = makeSut();

    const addWallet = {
      name: 'Any Wallet Name',
    };

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    };

    const reponse = await sut.add(addWallet, user);

    expect(reponse.id).toBeTruthy();
  });
});
