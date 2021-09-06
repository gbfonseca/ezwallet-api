import { FindUserByEmailRepository } from './../../../../../data/protocols/find-user-by-email-repository';
import { UserModel } from '../../../../../domain/models/user';
import { AddUserModel } from '../../../../../domain/usecases/add-user';
import { AddUserRepository } from '../../../../../data/protocols/add-user-repository';
import { User } from '../../entities/user.entity';
export class UserTypeormRepository
  implements AddUserRepository, FindUserByEmailRepository
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

  async findByEmail(email: string): Promise<UserModel> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
