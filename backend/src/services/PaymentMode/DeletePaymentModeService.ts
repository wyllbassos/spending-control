import { getRepository } from 'typeorm';

import PaymentMode from '../../models/PaymentMode';
import Transaction from '../../models/Transaction';

import AppError from '../../errors/AppError';

class DeletePaymentModeService {
  public async execute({ id }: { id: string }): Promise<void> {
    const paymentModeRepository = getRepository(PaymentMode);

    const paymentMode = await paymentModeRepository.findOne(id);

    if (!paymentMode) {
      throw new AppError('Id invalid');
    }

    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: { payment_mode_id: id }
    });

    if (transaction) {
      throw new AppError('This payment method is being used in some transaction');
    }

    const deleted = (await paymentModeRepository.delete(id)).affected;

    if (deleted === 0) {
      throw new AppError(`Error to delete id: ${id}`);
    }
  }
}

export default DeletePaymentModeService;
