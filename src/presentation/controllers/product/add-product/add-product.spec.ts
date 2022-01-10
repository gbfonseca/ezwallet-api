import { HttpRequest } from '../../../protocols/http';
import { AddProductController } from './add-product';

interface SutTypes {
  sut: AddProductController;
}

const makeSut = (): SutTypes => {
  const sut = new AddProductController();

  return { sut };
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
});
