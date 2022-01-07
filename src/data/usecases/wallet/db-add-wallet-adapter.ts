import { UserModel } from '../../../domain/models/user';
import { WalletModel } from '../../../domain/models/wallet';
import {
  AddWallet,
  AddWalletModel,
} from '../../../domain/usecases/wallet/add-wallet';
import { AddWalletRepository } from '../../protocols/add-wallet-repository';

export class DbAddWalletAdapter implements AddWallet {
  constructor(private readonly addWalletRepository: AddWalletRepository) {}

  async add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel> {
    const wallet = await this.addWalletRepository.add(addWallet, user);
    return wallet;
  }
}
