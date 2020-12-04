import { getRepository } from 'typeorm';

import SubCategory from '../../models/SubCategory';
import Transaction from '../../models/Transaction';

import AppError from '../../errors/AppError';

class DeleteSubCategoryService {
  public async execute({ id }: { id: string }): Promise<void> {
    const subCategoryRepository = getRepository(SubCategory);

    const subCategory = await subCategoryRepository.findOne(id);

    if (!subCategory) {
      throw new AppError('Id invalid');
    }

    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { sub_category_id: id }
    });

    if (transaction) {
      throw new AppError('This subCategory is being used in some transaction');
    }

    const deleted = (await subCategoryRepository.delete(id)).affected;

    if (deleted === 0) {
      throw new AppError(`Error to delete id: ${id}`);
    }
  }
}

export default DeleteSubCategoryService;
