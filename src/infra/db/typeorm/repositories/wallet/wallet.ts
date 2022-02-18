import { EntityRepository, getRepository, Repository } from 'typeorm';
import { AddWalletRepository } from '../../../../../data/protocols/add-wallet-repository';
import { FindWalletByIdRepository } from '../../../../../data/protocols/find-wallet-by-id-repository';
import { FindWalletsByUserIdRepository } from '../../../../../data/protocols/find-wallets-by-user-id-repository';
import { SetPrimaryWalletRepository } from '../../../../../data/protocols/set-primary-wallet-repository';
import { UserModel } from '../../../../../domain/models/user';
import { WalletModel } from '../../../../../domain/models/wallet';
import { AddWalletModel } from '../../../../../domain/usecases/wallet/add-wallet';
import { VariableIncome } from '../../entities/variable_income.entity';
import { Wallet } from '../../entities/wallet.entity';

@EntityRepository(Wallet)
export class WalletTypeormRepository
  extends Repository<Wallet>
  implements
    AddWalletRepository,
    FindWalletsByUserIdRepository,
    FindWalletByIdRepository,
    SetPrimaryWalletRepository
{
  async add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel> {
    const { name } = addWallet;
    const variableIncomeRepository = getRepository(VariableIncome);
    const wallet = this.create();

    wallet.name = name;
    wallet.user = user;
    wallet.variable_income = variableIncomeRepository.create({ products: [] });
    await this.save(wallet);

    return wallet;
  }

  async findById(id: string): Promise<WalletModel> {
    const wallet = await this.findOne({
      where: {
        id,
      },
    });

    return wallet;
  }

  async findByUserId(id: string): Promise<WalletModel[]> {
    const wallets = await this.find({
      where: {
        user: {
          id,
        },
      },
    });

    return wallets;
  }

  async setPrimary(walletId: string): Promise<WalletModel> {
    const wallet = await this.findOne({
      where: { id: walletId },
      join: {
        alias: 'wallet',
        leftJoinAndSelect: {
          user: 'wallet.user',
          variable_income: 'wallet.variable_income',
          products: 'variable_income.products',
          transactions: 'products.transactions',
        },
      },
    });
    wallet.primary = true;

    await this.save(wallet);

    const userId = wallet.user.id;

    const wallets = await this.find({
      select: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    for (const walletToNotPrimary of wallets) {
      walletToNotPrimary.primary = false;
      await this.save(walletToNotPrimary);
    }

    delete wallet.user;

    console.log(wallet);

    return wallet;
  }
}
