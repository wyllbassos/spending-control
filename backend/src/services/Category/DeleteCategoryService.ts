import { getRepository } from 'typeorm';

import Category from '../../models/Category';
import Transaction from '../../models/Transaction';

import AppError from '../../errors/AppError';

class DeleteCategoryService {
  public async execute({ id }: { id: string }): Promise<void> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Id invalid');
    }

    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { category_id: id }
    });

    if (transaction) {
      throw new AppError('This category is being used in some transaction');
    }

    const deleted = (await categoryRepository.delete(id)).affected;

    if (deleted === 0) {
      throw new AppError(`Error to delete id: ${id}`);
    }
  }
}

export default DeleteCategoryService;
