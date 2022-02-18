import { WalletModel } from '../../domain/models/wallet';

export interface SetPrimaryWalletRepository {
  setPrimary(walletId: string): Promise<WalletModel>;
}
