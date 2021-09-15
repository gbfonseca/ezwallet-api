import { FindUserByEmailRepository } from './../../../../../data/protocols/find-user-by-email-repository';
import { UserModel } from '../../../../../domain/models/user';
import { AddUserModel } from '../../../../../domain/usecases/add-user';
import { AddUserRepository } from '../../../../../data/protocols/add-user-repository';
import { User } from '../../entities/user.entity';
import { getRepository, Repository } from 'typeorm';
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
    delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await User.findOne({
      where: {
        email,
      },
      select: this.getCols<User>(getRepository(User)),
    });

    return user;
  }

  private getCols<T>(repository: Repository<T>): (keyof T)[] {
    return repository.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof T)[];
  }
}
