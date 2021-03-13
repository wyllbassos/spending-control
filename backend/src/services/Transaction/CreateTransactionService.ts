import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
// import Category from '../../models/Category';

import Transaction from '../../models/Transaction';

import CreateCategoryService from '../Category/CreateCategoryService';
import CreatePaymentModeService from '../PaymentMode/CreatePaymentModeService';
import CreateSubCategoryService from '../SubCategory/CreateSubCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  subCategory: string;
  paymentMode: string;
  date: string;
  payment_date: string;
  installment_number: number;
  installment_total: number;
  executed: boolean;
}

function checkIfValueIsValid(value: number, field: string): void {
  const valueString = String(value);
  const valueNumber = Number.parseFloat(valueString);

  if (Number.isNaN(valueNumber)) {
    throw new AppError(`The ${field} isn't a Number`);
  }
  if (value < 0) {
    throw new AppError(`The ${field} isn't a positive number`);
  }
}

function checkParms({
  title,
  type,
  value,
  date,
  category,
  paymentMode,
  subCategory,
  installment_number,
  installment_total,
  executed,
}: Request): void {
  if (!value) {
    throw new AppError(`The value field cannot be null or 0`);
  }

  if (!title) {
    throw new AppError('The title field cannot be null');
  }

  if (!type || (type !== 'income' && type !== 'outcome')) {
    throw new AppError('The type field must be income or outcome');
  }

  if (!date) {
    throw new AppError('The date field cannot be null');
  }

  if (!category) {
    throw new AppError('The category field cannot be null');
  }

  if (!paymentMode) {
    throw new AppError('The paymentMode field cannot be null');
  }

  if (!subCategory) {
    throw new AppError('The subCategory field cannot be null');
  }

  if (executed === undefined) {
    throw new AppError('The executed field cannot be null');
  }

  checkIfValueIsValid(value, 'value');

  const valueSplit = String(value).split('.');
  if (valueSplit.length > 1 && valueSplit[1].length > 2) {
    throw new AppError(`The max of fractional Part in value is 2 digits`);
  }

  if (installment_number) {
    checkIfValueIsValid(installment_number, 'installment_number');
    checkIfValueIsValid(installment_total, 'installment_total');
    if (installment_number > installment_total) {
      throw new AppError(
        `The installment_number field cannot be greater than the installment_total field`,
      );
    }
  }
}

class CreateTransactionService {
  public async execute(request: Request): Promise<Transaction> {
    checkParms(request);

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
    } = request;

    const transactionRepository = getRepository(Transaction);

    const createCategoryService = new CreateCategoryService();
    const createSubCategoryService = new CreateSubCategoryService();
    const createpaymentModeService = new CreatePaymentModeService();

    const categoryOfTransaction = await createCategoryService.execute({
      title: category,
    });
    const subCategoryOfTransaction = await createSubCategoryService.execute({
      title: subCategory,
    });
    const paymentModeOfTransaction = await createpaymentModeService.execute({
      title: paymentMode,
    });

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      date,
      payment_date,
      installment_number,
      installment_total,
      executed: !!executed,
      category_id: categoryOfTransaction.id,
      sub_category_id: subCategoryOfTransaction.id,
      payment_mode_id: paymentModeOfTransaction.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
