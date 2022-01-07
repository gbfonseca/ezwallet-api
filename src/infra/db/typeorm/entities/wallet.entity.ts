import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../../../../domain/models/user';
import { WalletModel } from '../../../../domain/models/wallet';
import { User } from './user.entity';

@Entity('wallet')
export class Wallet implements WalletModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ManyToOne(() => User, (user) => user.wallets)
  user: UserModel;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
