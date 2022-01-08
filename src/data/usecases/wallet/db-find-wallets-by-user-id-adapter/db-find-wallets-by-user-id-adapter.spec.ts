import { WalletModel } from '../../../../domain/models/wallet';
import { DbFindWalletsByUserIdAdapter } from './db-find-wallets-by-user-id-adapter';
import { FindWalletsByUserIdRepository } from '../../../protocols/find-wallets-by-user-id-repository';
interface SutTypes {
  sut: DbFindWalletsByUserIdAdapter;
  findWalletsByUserIdRepositoryStub: FindWalletsByUserIdRepository;
}

const makeFindWalletsByUserIdRepository = (): FindWalletsByUserIdRepository => {
  class FindWalletsByUserIdRepositoryStub
    implements FindWalletsByUserIdRepository
  {
    find(id: string): Promise<WalletModel[]> {
      const fakeWallet = {
        id: 'any_id',
        name: 'any_name',
        user: {
          id: 'any_id',
          email: 'any_email@mail.com',
          name: 'any_name',
          lastName: 'any_lastName',
        },
      };

      return new Promise((resolve) => resolve([fakeWallet]));
    }
  }

  return new FindWalletsByUserIdRepositoryStub();
};

const makeSut = (): SutTypes => {
  const findWalletsByUserIdRepositoryStub = makeFindWalletsByUserIdRepository();
  const sut = new DbFindWalletsByUserIdAdapter(
    findWalletsByUserIdRepositoryStub,
  );

  return { sut, findWalletsByUserIdRepositoryStub };
};

describe('DbFindWalletsByUserId Adapter', () => {
  it('should calls DbFindWalletsByUserIdAdapter with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'find');

    const id = 'any_id';

    await sut.find(id);

    expect(sutSpy).toHaveBeenCalledWith(id);
  });
  it('should throws if FindWalletsByUserIdRepository throws', async () => {
    const { sut, findWalletsByUserIdRepositoryStub } = makeSut();
    jest
      .spyOn(findWalletsByUserIdRepositoryStub, 'find')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const id = 'any_id';

    const promise = sut.find(id);

    await expect(promise).rejects.toThrow();
  });

  it('should return an wallets array on success', async () => {
    const { sut } = makeSut();

    const id = 'any_id';

    const response = await sut.find(id);

    expect(response.length).toBeGreaterThan(0);
  });
});
