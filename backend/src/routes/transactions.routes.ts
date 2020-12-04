import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import BalanceTransactionsService from '../services/BalanceTransactionsService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request: Request, response: Response) => {
  const balanceTransactionsService = new BalanceTransactionsService();
  const transactionRepository = getRepository(Transaction);

  const transactions = await transactionRepository.find();
  const balance = await balanceTransactionsService.execute();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  const { title, value, type, category } = request.body;

  const createTransactionService = new CreateTransactionService();

  const transactions = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });

  const categoryRepository = getRepository(Category);

  const transactionCategory = await categoryRepository.findOne(
    transactions.category_id,
  );

  return response.json({
    ...transactions,
    category_id: undefined,
    category: transactionCategory,
  });
});

transactionsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteTransactionService = new DeleteTransactionService();

    await deleteTransactionService.execute({ id });

    return response.json();
  },
);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request: Request, response: Response) => {
    const importTransactionsService = new ImportTransactionsService();
    const transactions = await importTransactionsService.execute({
      importFilename: request.file.filename,
    });
    return response.json({ transactions });
  },
);

export default transactionsRouter;
