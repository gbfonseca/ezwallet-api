import { UserModel } from '../usecases/user/db-add-user-adapter/db-add-user-adapter-protocols';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserModel>;
}
