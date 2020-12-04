import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute({ id }: { id: string }): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Id invalid');
    }

    const deleted = (await transactionRepository.delete(id)).affected;

    if (deleted === 0) {
      throw new AppError(`Error to delete id: ${id}`);
    }
  }
}

export default DeleteTransactionService;
