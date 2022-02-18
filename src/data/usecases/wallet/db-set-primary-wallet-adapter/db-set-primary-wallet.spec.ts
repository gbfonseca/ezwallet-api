import { DbSetPrimaryWalletAdapter } from './db-set-primary-wallet';

interface SutTypes {
  sut: DbSetPrimaryWalletAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new DbSetPrimaryWalletAdapter();

  return { sut };
};
describe('DbSetPrimaryWalletAdapter', () => {
  it('should calls DbSetPrimaryWallet with correct values', async () => {
    const { sut } = makeSut();

    const sutSpy = jest.spyOn(sut, 'setPrimary');

    const walletId = 'any_id';

    await sut.setPrimary(walletId);

    expect(sutSpy).toHaveBeenCalledWith(walletId);
  });
});
