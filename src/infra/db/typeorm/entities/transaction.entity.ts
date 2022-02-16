import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductModel } from '../../../../domain/models/product';
import {
  TransactionModel,
  TransactionTypeEnum,
} from '../../../../domain/models/transaction';
import { Product } from './product.entity';

@Entity('transaction')
export class Transaction implements TransactionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  name: string;

  @Column({
    type: 'integer',
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

  @Column({
    type: 'varchar',
  })
  type: string;

  @ManyToOne(() => Product, (product) => product.transactions)
  product?: ProductModel;
}
