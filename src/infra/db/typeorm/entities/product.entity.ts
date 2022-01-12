import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductModel } from '../../../../domain/models/product';
import { VariableIncomeModel } from '../../../../domain/usecases/wallet/variable_income';
import { VariableIncome } from './variable_income.entity';

@Entity('product')
export class Product implements ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
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
  price: number;

  @Column({ type: 'date' })
  purchase_date: Date;

  @Column({
    type: 'float',
    scale: 2,
    default: 0.0,
  })
  fees?: number;

  @ManyToOne(
    () => VariableIncome,
    (variable_income) => variable_income.products,
  )
  variable_income: VariableIncomeModel;
}
