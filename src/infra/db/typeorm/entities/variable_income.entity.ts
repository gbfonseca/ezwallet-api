import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WalletModel } from '../../../../domain/models/wallet';
import { VariableIncomeModel } from '../../../../domain/usecases/wallet/variable_income';
import { Wallet } from './wallet.entity';

@Entity('VariableIncome')
export class VariableIncome implements VariableIncomeModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    default: 'Renda Variável',
  })
  name: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0.0,
  })
  invested_value: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0.0,
  })
  current_value: number;

  @Column({
    type: 'float',
    scale: 2,
    default: 0.0,
  })
  percentage_yield: number;

  @OneToOne(() => Wallet, (wallet) => wallet.variable_income)
  wallet: WalletModel;
}