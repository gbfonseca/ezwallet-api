import { WalletModel } from '../../../../domain/models/wallet';
import { SetPrimaryWallet } from '../../../../domain/usecases/wallet/set-primary-wallet';
import { SetPrimaryWalletRepository } from '../../../protocols/set-primary-wallet-repository';

export class DbSetPrimaryWalletAdapter implements SetPrimaryWallet {
  constructor(
    private readonly setPrimaryWalletRepository: SetPrimaryWalletRepository,
  ) {}

  async setPrimary(walletId: string): Promise<WalletModel> {
    const primaryWallet = await this.setPrimaryWalletRepository.setPrimary(
      walletId,
    );

    return primaryWallet;
  }
}
