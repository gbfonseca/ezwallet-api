import { UpdateUserRepository } from './../../../protocols/update-user-repository';
import { UserModel } from '../../../../domain/models/user';
import {
  UpdateUser,
  UpdateUserModel,
} from './../../../../domain/usecases/update-user';

export class DbUpdateUserAdapter implements UpdateUser {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}

  async update(user: UserModel, data: UpdateUserModel): Promise<UserModel> {
    const updatedUser = await this.updateUserRepository.updateUser(user, data);
    return updatedUser;
  }
}
