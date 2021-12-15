import { UpdateUserRepository } from './../../../protocols/update-user-repository';
import { UserModel } from '../../../../domain/models/user';
import {
  UpdateUser,
  UpdateUserModel,
} from './../../../../domain/usecases/update-user';

export class DbUpdateUserAdapter implements UpdateUser {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}

  async update(id: string, data: UpdateUserModel): Promise<UserModel> {
    await this.updateUserRepository.update(id, data);
    return new Promise((resolve) => resolve(null));
  }
}
