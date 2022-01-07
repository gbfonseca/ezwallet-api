import { UpdateUserRepository } from './../../../../../data/protocols/update-user-repository';
import { FindUserByEmailRepository } from './../../../../../data/protocols/find-user-by-email-repository';
import { UserModel } from '../../../../../domain/models/user';
import { AddUserModel } from '../../../../../domain/usecases/add-user';
import { AddUserRepository } from '../../../../../data/protocols/add-user-repository';
import { User } from '../../entities/user.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UpdateUserModel } from '../../../../../domain/usecases/update-user';

@EntityRepository(User)
export class UserTypeormRepository
  extends Repository<User>
  implements AddUserRepository, FindUserByEmailRepository, UpdateUserRepository
{
  async add(addUser: AddUserModel): Promise<UserModel> {
    const user = this.create();
    user.name = addUser.name;
    user.lastName = addUser.lastName;
    user.email = addUser.email;
    user.password = addUser.password;
    await this.save(user);
    delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.findOne({
      where: {
        email,
      },
      select: this.getCols<User>(getRepository(User)),
    });
    return user;
  }

  async updateUser(
    user: UserModel,
    updateUser: UpdateUserModel,
  ): Promise<UserModel> {
    await this.update(user.id, updateUser);
    return {
      ...user,
      ...updateUser,
    };
  }

  private getCols<T>(repository: Repository<T>): (keyof T)[] {
    return repository.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof T)[];
  }
}
