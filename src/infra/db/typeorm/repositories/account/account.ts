import { AccountModel } from '../../../../../domain/models/account';
import { AddAccountModel } from '../../../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../../../../data/protocols/add-account-repository';
import { User } from '../../entities/account';
import { Repository, getRepository } from 'typeorm';
export class AccountTypeormRepository implements AddAccountRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const newUser = this.userRepository.create(addAccount);
    const user = await this.userRepository.save(newUser);
    return user;
  }
}
