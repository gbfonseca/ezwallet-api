import { getCustomRepository } from 'typeorm';
import { UserTypeormRepository } from '../../src/infra/db/typeorm/repositories/user/user';
import { fakeUser } from './fake-user';

export const createFakeUser = async () => {
  const userRepo = getCustomRepository(UserTypeormRepository);
  await userRepo.delete({});
  const user = await userRepo.add(fakeUser);
  return user;
};
