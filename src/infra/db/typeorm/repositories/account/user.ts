import { UserModel } from '../../../../../domain/models/user';
import { AddUserModel } from '../../../../../domain/usecases/add-user';
import { AddUserRepository } from '../../../../../data/protocols/add-user-repository';
import { User } from '../../entities/user';
import { Repository, getRepository } from 'typeorm';
export class UserTypeormRepository implements AddUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async add(addUser: AddUserModel): Promise<UserModel> {
    const newUser = this.userRepository.create(addUser);
    const user = await this.userRepository.save(newUser);
    return user;
  }
}
