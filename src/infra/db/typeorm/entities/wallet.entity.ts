import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../../../../domain/models/user';
import { WalletModel } from '../../../../domain/models/wallet';
import { VariableIncomeModel } from '../../../../domain/models/variable_income';
import { User } from './user.entity';
import { VariableIncome } from './variable_income.entity';

@Entity('wallet')
export class Wallet implements WalletModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @OneToOne(() => VariableIncome, (variable_icome) => variable_icome.wallet, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  variable_income: VariableIncomeModel;

  @ManyToOne(() => User, (user) => user.wallets)
  user: UserModel;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
