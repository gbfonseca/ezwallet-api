import { WalletModel } from '../../models/wallet';

export interface GetPrimaryWallet {
  getPrimary(userId: string): Promise<WalletModel>;
}
