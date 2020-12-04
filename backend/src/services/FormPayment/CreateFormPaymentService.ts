import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import FormPayment from '../../models/FormPayment';

interface Request {
  title: string;
}

class CreateFormPaymentService {
  public async execute({ title }: Request): Promise<FormPayment> {
    const formPaymentRepository = getRepository(FormPayment);

    if(!title) {
      console.log(title)
      throw new AppError("The title field cannot be null");
    }

    const checkFormPaymentExists = await formPaymentRepository.findOne({
      where: { title },
    });

    if (checkFormPaymentExists) {
      return checkFormPaymentExists;
    }

    const formPayment = formPaymentRepository.create({ title });

    await formPaymentRepository.save(formPayment);

    return formPayment;
  }
}

export default CreateFormPaymentService;
