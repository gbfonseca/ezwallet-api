import { WalletModel } from '../../domain/models/wallet';

export interface FindWalletsByUserIdRepository {
  find(id: string): Promise<WalletModel[]>;
}
