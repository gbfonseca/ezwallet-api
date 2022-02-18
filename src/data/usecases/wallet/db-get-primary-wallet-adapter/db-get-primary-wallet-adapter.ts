import { WalletModel } from '../../../../domain/models/wallet';
import { GetPrimaryWallet } from '../../../../domain/usecases/wallet/get-primary-wallet';

export class DbGetPrimaryWalletAdapter implements GetPrimaryWallet {
  async getPrimary(userId: string): Promise<WalletModel> {
    return new Promise((resolve) => resolve(null));
  }
}
