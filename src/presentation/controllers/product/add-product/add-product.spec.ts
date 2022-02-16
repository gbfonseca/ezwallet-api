import { HttpRequest } from '../../../protocols/http';
import { AddProductController } from './add-product';
import {
  AddProduct,
  AddProductModel,
} from '../../../../domain/usecases/product/add-product';
import { ProductModel } from '../../../../domain/models/product';
import { fakeWallet } from '../../../../../tests/factories/fake-wallet';
import { TransactionTypeEnum } from '../../../../domain/models/transaction';
interface SutTypes {
  sut: AddProductController;
  addProductStub: AddProduct;
}

const makeAddProduct = (): AddProduct => {
  class AddProductStub implements AddProduct {
    async add(
      walletId: string,
      addProduct: AddProductModel,
    ): Promise<ProductModel> {
      const fakeProduct: ProductModel = {
        id: 'any_id',
        name: 'any_code',
        quantity: 10,
        average_price: 29.8,
        total_price: 290.8,
        variable_income: {
          id: 'any_id',
          name: 'Renda Variável',
          invested_value: 0.0,
          current_value: 0.0,
          percentage_yield: 0.0,
        },
        transactions: [
          {
            id: 'any_id12',
            price: 29.8,
            purchase_date: new Date('2021-08-27'),
            fees: 0.51,
            name: 'any_code',
            quantity: 5,
            type: TransactionTypeEnum.PURCHASE,
          },
        ],
      };
      return new Promise((resolve) => resolve(fakeProduct));
    }
  }

  return new AddProductStub();
};
const makeSut = (): SutTypes => {
  const addProductStub = makeAddProduct();
  const sut = new AddProductController(addProductStub);

  return { sut, addProductStub };
};

describe('AddProduct Controller', () => {
  test('should calls AddProductController with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'handle');
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_code',
        quantity: 10,
        price: 29.8,
        purchase_date: '27-08-2021',
        fees: 0.51,
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('should return 400 if no name provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: null,
        quantity: 10,
        price: 29.8,
        purchase_date: '27-08-2021',
        fees: 0.51,
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 400 if no quantity provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_name',
        quantity: null,
        price: 29.8,
        purchase_date: '27-08-2021',
        fees: 0.51,
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 400 if no price provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_name',
        quantity: 10,
        price: null,
        purchase_date: '27-08-2021',
        fees: 0.51,
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 400 if no purchase_date provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_name',
        quantity: 10,
        price: 29.1,
        purchase_date: null,
        fees: 0.51,
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 400 if invalid purchase_date provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_name',
        quantity: 10,
        price: 29.1,
        purchase_date: '2021-08-1012',
        fees: 0.51,
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 500 if AddProduct throws', async () => {
    const { sut, addProductStub } = makeSut();
    jest
      .spyOn(addProductStub, 'add')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error())),
      );
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_code',
        quantity: 10,
        price: 29.8,
        purchase_date: '2021-08-21',
        fees: 0.51,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        walletId: 'any_id',
      },
      body: {
        name: 'any_code',
        quantity: 10,
        price: 29.8,
        purchase_date: '2021-08-21',
        fees: 0.51,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
