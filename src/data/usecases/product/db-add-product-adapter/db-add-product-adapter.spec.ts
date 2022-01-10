import { WalletModel } from '../../../../domain/models/wallet';
import { DbAddProductAdapter } from './db-add-product-adapter';
import { FindWalletByIdRepository } from '../../../protocols/find-wallet-by-id-repository';
import { AddProductRepository } from '../../../protocols/add-product-repository';
import { ProductModel } from '../../../../domain/models/product';
import { fakeWalletCreated } from '../../../../../tests/factories/fake-wallet';
import { AddProductModel } from '../../../../domain/usecases/product/add-product';

interface SutTypes {
  sut: DbAddProductAdapter;
  findWalletByIdRepositoryStub: FindWalletByIdRepository;
  addProductRepositoryStub: AddProductRepository;
}

const makeFindWalletByIdRepository = (): FindWalletByIdRepository => {
  class FindWalletByIdRepositoryStub implements FindWalletByIdRepository {
    async findById(id: string): Promise<WalletModel> {
      return new Promise((resolve) =>
        resolve({
          id,
          name: 'Any Walelt',
          variable_income: {
            id: 'any_id',
            name: 'Renda Variável',
            invested_value: 0.0,
            current_value: 0.0,
            percentage_yield: 0.0,
          },
        }),
      );
    }
  }

  return new FindWalletByIdRepositoryStub();
};

const makeAddProductRepository = (): AddProductRepository => {
  class AddProductRepositoryStub implements AddProductRepository {
    async add(addProduct: AddProductModel): Promise<ProductModel> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          ...addProduct,
        }),
      );
    }
  }

  return new AddProductRepositoryStub();
};

const makeSut = (): SutTypes => {
  const findWalletByIdRepositoryStub = makeFindWalletByIdRepository();
  const addProductRepositoryStub = makeAddProductRepository();
  const sut = new DbAddProductAdapter(
    findWalletByIdRepositoryStub,
    addProductRepositoryStub,
  );

  return { sut, findWalletByIdRepositoryStub, addProductRepositoryStub };
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

  test('should calls DbAddProduct throws AddProductRepository throws', async () => {
    const { sut, addProductRepositoryStub } = makeSut();
    jest
      .spyOn(addProductRepositoryStub, 'add')
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

  test('should calls DbAddProduct return a product on success', async () => {
    const { sut } = makeSut();
    const walletId = 'any_id';
    const data = {
      name: 'any_code',
      quantity: 10,
      price: 29.8,
      purchase_date: new Date('2021-08-21'),
      fees: 0.51,
    };

    const response = await sut.add(walletId, data);

    expect(response.id).toBeTruthy();
  });
});
