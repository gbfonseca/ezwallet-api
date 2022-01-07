import {
  UserModel,
  WalletModel,
  AddWallet,
  AddWalletModel,
  AddWalletRepository,
} from './db-add-wallet-protocols';

export class DbAddWalletAdapter implements AddWallet {
  constructor(private readonly addWalletRepository: AddWalletRepository) {}

  async add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel> {
    const wallet = await this.addWalletRepository.add(addWallet, user);
    return wallet;
  }
}
