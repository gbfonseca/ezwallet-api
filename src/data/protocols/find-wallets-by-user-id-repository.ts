import { WalletModel } from '../../domain/models/wallet';

export interface FindWalletsByUserIdRepository {
  findByUserId(id: string): Promise<WalletModel[]>;
}
