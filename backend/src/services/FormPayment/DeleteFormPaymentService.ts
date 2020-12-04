import { getRepository } from 'typeorm';

import FormPayment from '../../models/FormPayment';
import Transaction from '../../models/Transaction';

import AppError from '../../errors/AppError';

class DeleteFormPaymentService {
  public async execute({ id }: { id: string }): Promise<void> {
    const formPaymentRepository = getRepository(FormPayment);

    const formPayment = await formPaymentRepository.findOne(id);

    if (!formPayment) {
      throw new AppError('Id invalid');
    }

    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { category_id: id }
    });

    if (transaction) {
      throw new AppError('This payment method is being used in some transaction');
    }

    const deleted = (await formPaymentRepository.delete(id)).affected;

    if (deleted === 0) {
      throw new AppError(`Error to delete id: ${id}`);
    }
  }
}

export default DeleteFormPaymentService;
