import { UserModel } from '../../../../../domain/models/user';
import { AddUserModel } from '../../../../../domain/usecases/add-user';
import { AddUserRepository } from '../../../../../data/protocols/add-user-repository';
import { User } from '../../entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';
@EntityRepository(User)
export class UserTypeormRepository
  extends Repository<User>
  implements AddUserRepository
{
  async add(addUser: AddUserModel): Promise<UserModel> {
    const newUser = new User();
    newUser.name = addUser.name;
    newUser.lastName = addUser.lastName;
    newUser.email = addUser.email;
    newUser.password = addUser.password;
    const user = await newUser.save();
    return user;
  }
}
