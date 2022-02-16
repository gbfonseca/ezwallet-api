import { EntityRepository, getRepository, Repository } from 'typeorm';
import { AddWalletRepository } from '../../../../../data/protocols/add-wallet-repository';
import { FindWalletByIdRepository } from '../../../../../data/protocols/find-wallet-by-id-repository';
import { FindWalletsByUserIdRepository } from '../../../../../data/protocols/find-wallets-by-user-id-repository';
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
    FindWalletByIdRepository
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
}
