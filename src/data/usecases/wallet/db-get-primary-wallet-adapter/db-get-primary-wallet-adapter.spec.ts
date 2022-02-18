import { WalletModel } from '../../../../domain/models/wallet';
import { GetPrimaryWalletRepository } from '../../../protocols/get-primary-wallet-repository';
import { DbGetPrimaryWalletAdapter } from './db-get-primary-wallet-adapter';
import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
interface SutTypes {
  sut: DbGetPrimaryWalletAdapter;
  getPrimaryWalletRepositoryStub: GetPrimaryWalletRepository;
}

const makeGetPrimaryWalletRepository = (): GetPrimaryWalletRepository => {
  class GetPrimaryWalletRepositoryStub implements GetPrimaryWalletRepository {
    async getPrimary(userId: string): Promise<WalletModel> {
      return new Promise((resolve) => resolve(fakeWalletCreated));
    }
  }

  return new GetPrimaryWalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const getPrimaryWalletRepositoryStub = makeGetPrimaryWalletRepository();
  const sut = new DbGetPrimaryWalletAdapter(getPrimaryWalletRepositoryStub);

  return { sut, getPrimaryWalletRepositoryStub };
};

describe('DbGetPrimaryWallet Adapter', () => {
  it('should called DbGetPrimaryWalletAdapter with correct values', async () => {
    const { sut } = makeSut();

    const sutSpy = jest.spyOn(sut, 'getPrimary');

    const user_id = 'any_id';

    await sut.getPrimary(user_id);

    expect(sutSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throws if GetPrimaryWalletRepository throws', async () => {
    const { sut, getPrimaryWalletRepositoryStub } = makeSut();

    jest
      .spyOn(getPrimaryWalletRepositoryStub, 'getPrimary')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const user_id = 'any_id';

    const promise = sut.getPrimary(user_id);

    await expect(promise).rejects.toThrow();
  });
});
