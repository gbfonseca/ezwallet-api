import { UserModel } from '../../../../domain/models/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WalletModel } from '../../../../domain/models/wallet';
import { Wallet } from './wallet.entity';

@Entity('user')
export class User implements UserModel {
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

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: WalletModel[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
