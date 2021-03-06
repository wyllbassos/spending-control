import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import PaymentMode from '../models/PaymentMode';
import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/Transaction/CreateTransactionService';
// import BalanceTransactionsService from '../services/Transaction/Balance/BalanceTransactionsService';
import DeleteTransactionService from '../services/Transaction/DeleteTransactionService';
import ImportTransactionsService from '../services/Transaction/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request: Request, response: Response) => {
  const transactionRepository = getRepository(Transaction);

  const transactions = await transactionRepository.find({
    relations: ['category', 'subCategory', 'paymentMode'],
  });

  return response.json(transactions);
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  const {
    title,
    value,
    type,
    category,
    subCategory,
    paymentMode,
    date,
    payment_date,
    installment_number,
    installment_total,
    executed,
  } = request.body;

  const createTransactionService = new CreateTransactionService();

  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
    subCategory,
    paymentMode,
    date,
    payment_date,
    installment_number,
    installment_total,
    executed,
  });

  const categoryRepository = getRepository(Category);

  const transactionCategory = await categoryRepository.findOne(
    transaction.category_id,
  );

  const subCategoryRepository = getRepository(SubCategory);

  const transactionSubCategory = await subCategoryRepository.findOne(
    transaction.sub_category_id,
  );

  const paymentModeRepository = getRepository(PaymentMode);

  const transactionPaymentMode = await paymentModeRepository.findOne(
    transaction.payment_mode_id,
  );

  return response.json({
    ...transaction,
    category_id: undefined,
    sub_category_id: undefined,
    payment_mode_id: undefined,
    category: transactionCategory,
    subCategory: transactionSubCategory,
    paymentMode: transactionPaymentMode,
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
    return response.json(transactions);
  },
);

export default transactionsRouter;
