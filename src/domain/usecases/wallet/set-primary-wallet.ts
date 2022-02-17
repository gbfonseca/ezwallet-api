import { WalletModel } from '../../models/wallet';

export interface SetPrimaryWallet {
  setPrimary(walletId: string): Promise<WalletModel>;
}
