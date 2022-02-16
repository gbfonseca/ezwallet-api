import { WalletModel } from '../../src/domain/models/wallet';

export const fakeWallet = {
  name: 'Any Wallet Name',
};

export const fakeWalletCreated: WalletModel = {
  id: 'any_id',
  ...fakeWallet,
  variable_income: {
    id: 'any_id',
    name: 'Renda Variável',
    invested_value: 0.0,
    current_value: 0.0,
    percentage_yield: 0.0,
  },
};
