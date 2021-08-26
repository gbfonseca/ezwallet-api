import { AccountModel } from '../../../../../domain/models/account';
import { AddAccountModel } from '../../../../../domain/usecases/add-account';
import { TypeormHelper } from '../../helpers/typeorm-helper';
import { AddAccountRepository } from '../../../../../data/protocols/add-account-repository';
import { User } from '../../entities/account';
import { getRepository } from 'typeorm';
export class AccountPostgresRepository implements AddAccountRepository {
  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const user = new User();
    user.name = addAccount.name;
    user.lastName = addAccount.lastName;
    user.email = addAccount.email;
    user.password = addAccount.password;
    const userRepository = getRepository(User);
    await userRepository.save(user);
    return user;
  }
}
