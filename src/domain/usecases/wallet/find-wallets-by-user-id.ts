import { WalletModel } from '../../models/wallet';

export interface FindWalletsByUserId {
  find(id: string): Promise<WalletModel>;
}
