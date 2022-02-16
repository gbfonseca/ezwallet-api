import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../../../../domain/models/product';
import { TransactionModel } from '../../../../domain/models/transaction';
import { VariableIncomeModel } from '../../../../domain/models/variable_income';
import { Transaction } from './transaction.entity';
import { VariableIncome } from './variable_income.entity';
@Entity('product')
export class Product implements ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 128 })
  name: string;

  @Column({
    type: 'float',
    scale: 2,
    default: 0.0,
  })
  quantity: number;

  @Column({
    type: 'float',
    scale: 2,
    default: 0.0,
  })
  total_price: number;

  @Column({
    type: 'float',
    scale: 2,
    default: 0.0,
  })
  average_price: number;

  @OneToMany(() => Transaction, (transaction) => transaction.product, {
    eager: true,
    cascade: true,
  })
  transactions: TransactionModel[];

  @ManyToOne(() => VariableIncome, (variable_icome) => variable_icome.products)
  @JoinColumn()
  variable_income: VariableIncomeModel;

  @AfterLoad()
  async setValues() {
    this.total_price = this.transactions.reduce(
      (acumulator, actual) =>
        actual.type === 'purchase' &&
        (acumulator += actual.quantity * actual.price),
      0,
    );

    this.quantity = this.transactions.reduce(
      (acumulator, actual) =>
        actual.type === 'purchase' && (acumulator += actual.quantity),
      0,
    );

    this.average_price = this.total_price / this.quantity;
  }
}
