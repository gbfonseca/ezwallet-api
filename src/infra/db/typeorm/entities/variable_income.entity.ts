import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletModel } from '../../../../domain/models/wallet';
import { VariableIncomeModel } from '../../../../domain/models/variable_income';
import { Wallet } from './wallet.entity';
import { ProductModel } from '../../../../domain/models/product';
import { Product } from './product.entity';

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

  @OneToMany(() => Product, (product) => product.variable_income, {
    nullable: true,
    eager: true,
  })
  products: ProductModel[];

  @AfterLoad()
  async setValues() {
    this.invested_value = this.products.reduce(
      (acumulator, actual) => (acumulator += actual.total_price),
      0,
    );

    this.current_value = 0;

    const percentage =
      (100 * (this.invested_value - this.current_value)) / this.invested_value;

    this.percentage_yield = percentage ? percentage : 0;
  }
}
