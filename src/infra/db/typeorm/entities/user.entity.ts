import { UserModel } from '../../../../domain/models/user';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 512, nullable: false, select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
