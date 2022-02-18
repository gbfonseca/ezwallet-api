import { DbSetPrimaryWalletAdapter } from './db-set-primary-wallet';
import { SetPrimaryWalletRepository } from '../../../protocols/set-primary-wallet-repository';
import { WalletModel } from '../../../../domain/models/wallet';
import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
interface SutTypes {
  sut: DbSetPrimaryWalletAdapter;
  setPrimaryWalletRepositoryStub: SetPrimaryWalletRepository;
}

const makeSetPrimaryWalletRepository = (): SetPrimaryWalletRepository => {
  class SetPrimaryWalletRepositoryStub implements SetPrimaryWalletRepository {
    setPrimary(walletId: string): Promise<WalletModel> {
      return new Promise((resolve) => resolve(fakeWalletCreated));
    }
  }

  return new SetPrimaryWalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const setPrimaryWalletRepositoryStub = makeSetPrimaryWalletRepository();

  const sut = new DbSetPrimaryWalletAdapter(setPrimaryWalletRepositoryStub);

  return { sut, setPrimaryWalletRepositoryStub };
};

describe('DbSetPrimaryWalletAdapter', () => {
  it('should calls DbSetPrimaryWallet with correct values', async () => {
    const { sut } = makeSut();

    const sutSpy = jest.spyOn(sut, 'setPrimary');

    const walletId = 'any_id';

    await sut.setPrimary(walletId);

    expect(sutSpy).toHaveBeenCalledWith(walletId);
  });

  it('should throws if SetPrimaryWalletRepository throws', async () => {
    const { sut, setPrimaryWalletRepositoryStub } = makeSut();

    jest
      .spyOn(setPrimaryWalletRepositoryStub, 'setPrimary')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const walletId = 'any_id';

    const promise = sut.setPrimary(walletId);

    await expect(promise).rejects.toThrow();
  });

  it('should return an wallet on success', async () => {
    const { sut } = makeSut();

    const walletId = 'any_id';

    const response = await sut.setPrimary(walletId);

    expect(response.id).toBeTruthy();
  });
});
