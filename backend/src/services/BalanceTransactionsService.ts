import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Response {
  income: number;
  outcome: number;
  total: number;
}

class BalanceTransactionsService {
  public async execute(): Promise<Response> {
    const transactionRepository = getRepository(Transaction);

    const transactions = await transactionRepository.find();

    const income = transactions
      .filter(({ type }) => type === 'income')
      .reduce((total, { value }) => total + value, 0);

    const outcome = transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, { value }) => total + value, 0);

    const total = income - outcome;
    return { income, outcome, total };
  }
}

export default BalanceTransactionsService;
