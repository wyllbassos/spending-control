import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTransactions1604879024928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'payment_date',
            type: 'date',
          },
          {
            name: 'installment_number',
            type: 'int',
          },
          {
            name: 'installment_total',
            type: 'int',
          },
          {
            name: 'executed',
            type: 'boolean',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['income', 'outcome'],
          },
          {
            name: 'value',
            type: 'float',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'sub_category_id',
            type: 'uuid',
          },
          {
            name: 'payment_mode_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'CategoryTransaction',
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'PaymentModeTransaction',
        columnNames: ['payment_mode_id'],
        referencedTableName: 'payment_modes',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'SubCategoryTransaction',
        columnNames: ['sub_category_id'],
        referencedTableName: 'sub_categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
