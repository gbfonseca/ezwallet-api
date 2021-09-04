import { UserModel } from '../usecases/user/db-add-user-adapter-protocols';

export interface FindUserByEmailRepository {
  find(email: string): Promise<UserModel>;
}
