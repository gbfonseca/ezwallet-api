import { WalletModel } from '../../domain/models/wallet';

export interface GetPrimaryWalletRepository {
  getPrimary(userId: string): Promise<WalletModel>;
}
