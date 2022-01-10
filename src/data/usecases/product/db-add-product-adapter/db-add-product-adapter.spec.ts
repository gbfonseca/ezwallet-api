import { DbAddProductAdapter } from './db-add-product-adapter';

interface SutTypes {
  sut: DbAddProductAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new DbAddProductAdapter();

  return { sut };
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
});
