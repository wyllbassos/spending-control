import { getRepository } from 'typeorm';

import PaymentMode from '../../models/PaymentMode';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  title: string;
}

class UpdatePaymentModeService {
  public async execute({ id, title }: Request): Promise<PaymentMode> {
    const paymentModeRepository = getRepository(PaymentMode);

    const paymentMode = await paymentModeRepository.findOne(id);

    if (!paymentMode) {
      throw new AppError('Id invalid');
    }

    if (!title) {
      throw new AppError('The title field cannot be null');
    }

    const checkExistsPaymentModeTitle = await paymentModeRepository.findOne({
      where: { title },
    });

    if (checkExistsPaymentModeTitle) {
      if (checkExistsPaymentModeTitle.id === id) {
        return checkExistsPaymentModeTitle;
      }
      throw new AppError('This paymentMode title is alredy used');
    }

    paymentMode.title = title;

    await paymentModeRepository.save(paymentMode);

    return paymentMode;
  }
}

export default UpdatePaymentModeService;
