import { WalletModel } from '../../../../domain/models/wallet';
import { GetPrimaryWallet } from '../../../../domain/usecases/wallet/get-primary-wallet';
import { GetPrimaryWalletRepository } from '../../../protocols/get-primary-wallet-repository';

export class DbGetPrimaryWalletAdapter implements GetPrimaryWallet {
  constructor(
    private readonly getPrimaryWalletRepository: GetPrimaryWalletRepository,
  ) {}

  async getPrimary(userId: string): Promise<WalletModel> {
    const primaryWallet = await this.getPrimaryWalletRepository.getPrimary(
      userId,
    );

    return primaryWallet;
  }
}
