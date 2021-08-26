import { AccountModel } from '../../../../domain/models/account';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User implements AccountModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
