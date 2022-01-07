import { DbAddWalletAdapter } from './db-add-wallet-adapter';

interface SutTypes {
  sut: DbAddWalletAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new DbAddWalletAdapter();

  return { sut };
};

describe('DbAddWalletAdapter', () => {
  it('should calls DbAddWalletApdater with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'add');
    const addWallet = {
      name: 'Any Wallet Name',
    };

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    await sut.add(addWallet, user);

    expect(sutSpy).toBeCalledWith(addWallet, user);
  });
});
