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
import FormPayment from './FormPayment';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('enum')
  type: 'income' | 'outcome';

  @Column('decimal')
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  form_paynent_id: string;

  @ManyToOne(() => FormPayment, formPayment => formPayment.transaction, { eager: true })
  @JoinColumn({ name: 'form_paynent_id' })
  formPaynent: FormPayment;

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
