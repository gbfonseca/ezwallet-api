import { WalletModel } from '../../../../domain/models/wallet';
import { DbAddProductAdapter } from './db-add-product-adapter';
import { fakeWallet } from '../../../../../tests/factories/fake-wallet';
import { FindWalletByIdRepository } from '../../../protocols/find-wallet-by-id-repository';

interface SutTypes {
  sut: DbAddProductAdapter;
  findWalletByIdRepositoryStub: FindWalletByIdRepository;
}

const makeFindWalletByIdRepository = (): FindWalletByIdRepository => {
  class FindWalletByIdRepositoryStub implements FindWalletByIdRepository {
    async findById(id: string): Promise<WalletModel> {
      return new Promise((resolve) =>
        resolve({
          id,
          ...fakeWallet,
        }),
      );
    }
  }

  return new FindWalletByIdRepositoryStub();
};

const makeSut = (): SutTypes => {
  const findWalletByIdRepositoryStub = makeFindWalletByIdRepository();
  const sut = new DbAddProductAdapter(findWalletByIdRepositoryStub);

  return { sut, findWalletByIdRepositoryStub };
};

describe('DbAddProduct Adapter', () => {
  test('should calls DbAddProduct with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'add');
    const walletId = 'any_id';
    const data = {
      name: 'any_code',
      quantity: 10,
      price: 29.8,
      purchase_date: new Date('2021-08-21'),
      fees: 0.51,
    };

    await sut.add(walletId, data);

    expect(sutSpy).toHaveBeenCalledWith(walletId, data);
  });

  test('should calls DbAddProduct throws FindWalletByIdRepository throws', async () => {
    const { sut, findWalletByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findWalletByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const walletId = 'any_id';
    const data = {
      name: 'any_code',
      quantity: 10,
      price: 29.8,
      purchase_date: new Date('2021-08-21'),
      fees: 0.51,
    };

    const promise = sut.add(walletId, data);

    await expect(promise).rejects.toThrow();
  });
});
