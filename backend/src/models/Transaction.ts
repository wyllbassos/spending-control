import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Category';
import SubCategory from './SubCategory';
import PaymentMode from './PaymentMode';

export enum EnumTransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: string;

  @Column('date')
  payment_date: string;

  @Column()
  title: string;

  @Column('enum', { nullable: false, enum: EnumTransactionType })
  type: EnumTransactionType;

  @Column('decimal')
  value: number;

  @Column('int')
  installment_number: number;

  @Column('int')
  installment_total: number;

  @Column('boolean')
  executed: boolean;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  payment_mode_id: string;

  @ManyToOne(() => PaymentMode, paymentMode => paymentMode.transaction, { eager: true })
  @JoinColumn({ name: 'payment_mode_id' })
  paymentMode: PaymentMode;

  @Column()
  sub_category_id: string;

  @ManyToOne(() => SubCategory, subCategory => subCategory.transaction, { eager: true })
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
