import { WalletModel } from '../../domain/models/wallet';

export interface FindWalletByIdRepository {
  findById(id: string): Promise<WalletModel>;
}
