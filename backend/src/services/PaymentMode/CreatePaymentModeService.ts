import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import PaymentMode from '../../models/PaymentMode';

interface Request {
  title: string;
}

class CreatePaymentModeService {
  public async execute({ title }: Request): Promise<PaymentMode> {
    const paymentModeRepository = getRepository(PaymentMode);

    if(!title) {
      console.log(title)
      throw new AppError("The title field cannot be null");
    }

    const checkPaymentModeExists = await paymentModeRepository.findOne({
      where: { title },
    });

    if (checkPaymentModeExists) {
      return checkPaymentModeExists;
    }

    const paymentMode = paymentModeRepository.create({ title });

    await paymentModeRepository.save(paymentMode);

    return paymentMode;
  }
}

export default CreatePaymentModeService;
