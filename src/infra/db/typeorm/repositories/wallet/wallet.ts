import { EntityRepository, Repository } from 'typeorm';
import { AddWalletRepository } from '../../../../../data/protocols/add-wallet-repository';
import { UserModel } from '../../../../../domain/models/user';
import { WalletModel } from '../../../../../domain/models/wallet';
import { AddWalletModel } from '../../../../../domain/usecases/wallet/add-wallet';
import { Wallet } from '../../entities/wallet.entity';

@EntityRepository(Wallet)
export class WalletTypeormRepository
  extends Repository<Wallet>
  implements AddWalletRepository
{
  async add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel> {
    const { name } = addWallet;
    const wallet = this.create();

    wallet.name = name;
    wallet.user = user;

    await this.save(wallet);

    return wallet;
  }
}
