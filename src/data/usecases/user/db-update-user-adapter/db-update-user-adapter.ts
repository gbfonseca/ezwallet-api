import { UserModel } from '../../../../domain/models/user';
import {
  UpdateUser,
  UpdateUserModel,
} from './../../../../domain/usecases/update-user';

export class DbUpdateUserAdapter implements UpdateUser {
  async update(id: string, data: UpdateUserModel): Promise<UserModel> {
    return new Promise((resolve) => resolve(null));
  }
}
