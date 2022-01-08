import { WalletModel } from '../../../../domain/models/wallet';
import { FindWalletsByUserId } from '../../../../domain/usecases/wallet/find-wallets-by-user-id';

export class DbFindWalletsByUserIdAdapter implements FindWalletsByUserId {
  async find(id: string): Promise<WalletModel[]> {
    return new Promise((resolve) => resolve(null));
  }
}
