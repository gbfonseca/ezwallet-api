import { WalletModel } from '../../../../domain/models/wallet';
import { FindWalletsByUserId } from '../../../../domain/usecases/wallet/find-wallets-by-user-id';
import { FindWalletsByUserIdRepository } from '../../../protocols/find-wallets-by-user-id-repository';

export class DbFindWalletsByUserIdAdapter implements FindWalletsByUserId {
  constructor(
    private readonly findWalletsByUserIdRepository: FindWalletsByUserIdRepository,
  ) {}

  async find(id: string): Promise<WalletModel[]> {
    await this.findWalletsByUserIdRepository.find(id);
    return new Promise((resolve) => resolve(null));
  }
}