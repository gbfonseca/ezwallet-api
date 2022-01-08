import { DbFindWalletsByUserIdAdapter } from './db-find-wallets-by-user-id-adapter';

interface SutTypes {
  sut: DbFindWalletsByUserIdAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new DbFindWalletsByUserIdAdapter();

  return { sut };
};

describe('DbFindWalletsByUserId Adapter', () => {
  it('should calls DbFindWalletsByUserIdAdapter with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'find');

    const id = 'any_id';

    await sut.find(id);

    expect(sutSpy).toHaveBeenCalledWith(id);
  });
});
