import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import PaymentMode from '../models/PaymentMode';

// import PaymentModesRepository from '../repositories/PaymentModesRepository';
import CreatePaymentModeService from '../services/PaymentMode/CreatePaymentModeService';
import DeletePaymentModeService from '../services/PaymentMode/DeletePaymentModeService';

const paymentModesRouter = Router();

paymentModesRouter.get('/', async (request: Request, response: Response) => {
  const paymentModeRepository = getRepository(PaymentMode);

  const paymentModes = await paymentModeRepository.find();

  return response.json(paymentModes);
});

paymentModesRouter.post('/', async (request: Request, response: Response) => {
  const { title } = request.body;

  const createPaymentModeService = new CreatePaymentModeService();

  const paymentMode = await createPaymentModeService.execute({ title });

  return response.json(paymentMode);
});

paymentModesRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const deletePaymentModeService = new DeletePaymentModeService();

    await deletePaymentModeService.execute({ id });

    return response.json();
  },
);

export default paymentModesRouter;
