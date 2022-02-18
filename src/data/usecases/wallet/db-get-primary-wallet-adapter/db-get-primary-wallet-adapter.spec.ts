import { DbGetPrimaryWalletAdapter } from './db-get-primary-wallet-adapter';

interface SutTypes {
  sut: DbGetPrimaryWalletAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new DbGetPrimaryWalletAdapter();

  return { sut };
};

describe('DbGetPrimaryWallet Adapter', () => {
  it('should called DbGetPrimaryWalletAdapter with correct values', async () => {
    const { sut } = makeSut();

    const sutSpy = jest.spyOn(sut, 'getPrimary');

    const user_id = 'any_id';

    await sut.getPrimary(user_id);

    expect(sutSpy).toHaveBeenCalledWith(user_id);
  });
});
