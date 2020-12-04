import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Category from '../../models/Category';

import Transaction from '../../models/Transaction';

import CreateCategoryService from '../Category/CreateCategoryService';
import CreateFormPaymentService from '../FormPayment/CreateFormPaymentService';
import CreateSubCategoryService from '../SubCategory/CreateSubCategoryService';
import BalanceTransactionsService from './Balance/BalanceTransactionsService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  subCategory: string,
  formPayment: string
}

function checkIfValueIsValid(value: number): void {
  if (!value) {
    throw new AppError('The value field cannot be null');
  }

  const valueString = String(value);
  const valueNumber = Number.parseFloat(valueString);
  const valueSplit = valueString.split('.');

  if (Number.isNaN(valueNumber)) {
    throw new AppError("The value isn't a Number");
  }
  if (valueSplit.length > 1 && valueSplit[1].length > 2) {
    throw new AppError('The max of fractional Part in value is 2 digits');
  }
  if (value <= 0) {
    throw new AppError("The value isn't a positive number");
  }
}

function checkParms(
  { title, type, value }: Request
): void {
  if (!title) {
    throw new AppError('The title field cannot be null');
  }

  if (!type || (type !== 'income' && type !== 'outcome')) {
    throw new AppError('The type field must be income or outcome');
  }

  checkIfValueIsValid(value);
}

class CreateTransactionService {
  public async execute(request: Request): Promise<Transaction> {
    const {
      title,
      value,
      type,
      category,
      subCategory,
      formPayment
    } = request;
    const transactionRepository = getRepository(Transaction);
    const balanceTransactionsService = new BalanceTransactionsService();

    const balance = (await balanceTransactionsService.execute()).total;

    checkParms(request);

    let categoryOfTransaction = new Category();

    if (category) {
      const createCategoryService = new CreateCategoryService();

      categoryOfTransaction = await createCategoryService.execute({
        title: category,
      });
    }

    let subCategoryOfTransaction = new Category();

    if (subCategory) {
      const createSubCategoryService = new CreateSubCategoryService();

      subCategoryOfTransaction = await createSubCategoryService.execute({
        title: subCategory,
      });
    }

    let formPaymentOfTransaction = new Category();

    if (formPayment) {
      const createformPaymentService = new CreateFormPaymentService();

      formPaymentOfTransaction = await createformPaymentService.execute({
        title: formPayment,
      });
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryOfTransaction.id,
      sub_category_id: subCategoryOfTransaction.id,
      form_paynent_id: formPaymentOfTransaction.id
    });
    console.log(balance, transaction);
    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
