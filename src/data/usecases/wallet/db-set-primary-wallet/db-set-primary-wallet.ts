import { WalletModel } from '../../../../domain/models/wallet';
import { SetPrimaryWallet } from '../../../../domain/usecases/wallet/set-primary-wallet';

export class DbSetPrimaryWalletAdapter implements SetPrimaryWallet {
  async setPrimary(walletId: string): Promise<WalletModel> {
    return new Promise((resolve) => resolve(null));
  }
}
