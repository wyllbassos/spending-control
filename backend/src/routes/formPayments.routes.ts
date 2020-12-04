import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import FormPayment from '../models/FormPayment';

// import FormPaymentsRepository from '../repositories/FormPaymentsRepository';
import CreateFormPaymentService from '../services/FormPayment/CreateFormPaymentService';
import DeleteFormPaymentService from '../services/FormPayment/DeleteFormPaymentService';

const formPaymentsRouter = Router();

formPaymentsRouter.get('/', async (request: Request, response: Response) => {
  const formPaymentRepository = getRepository(FormPayment);

  const formPayments = await formPaymentRepository.find();

  return response.json({ formPayments });
});

formPaymentsRouter.post('/', async (request: Request, response: Response) => {
  const { title } = request.body;

  const createFormPaymentService = new CreateFormPaymentService();

  const formPayments = await createFormPaymentService.execute({ title });

  return response.json({ formPayments });
});

formPaymentsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteFormPaymentService = new DeleteFormPaymentService();

    await deleteFormPaymentService.execute({ id });

    return response.json();
  },
);

export default formPaymentsRouter;
