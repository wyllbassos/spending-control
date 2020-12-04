import path from 'path';
import fs from 'fs';
import csvParse from 'csv-parse';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

interface Request {
  importFilename: string;
}

interface TransactionCreate {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

const propsTransactionCreate = ['title', 'type', 'value', 'category'];
const propsTransactionImportOrder: { [key: string]: number } = {};

async function loadCSV(filePath: string): Promise<TransactionCreate[]> {
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const transactions: TransactionCreate[] = [];

  parseCSV.on('data', line => {
    const transaction: TransactionCreate = {
      title: line[propsTransactionImportOrder.title],
      category: line[propsTransactionImportOrder.category],
      type: line[propsTransactionImportOrder.type],
      value: line[propsTransactionImportOrder.value],
    };
    transactions.push(transaction);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return transactions;
}

async function checkHeader(filePath: string): Promise<boolean> {
  let headerIsOk = true;
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    to_line: 1,
    from_line: 1,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  parseCSV.on('data', line => {
    line.forEach((field: string) => {
      const propsFilter = propsTransactionCreate.filter((prop, i) => {
        if (prop === field) {
          propsTransactionImportOrder[prop] = i;
          return true;
        }
        return false;
      });
      if (propsFilter.length === 0) headerIsOk = false;
    });
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return headerIsOk;
}

async function execArrayInAsyncFunction(
  arr: TransactionCreate[],
): Promise<Transaction[]> {
  if (arr.length > 0) {
    const createTransactionService = new CreateTransactionService();
    const item = arr[0];
    arr.shift();
    const ret0 = await createTransactionService.execute(item);
    return [ret0, ...(await execArrayInAsyncFunction(arr))];
  }
  return [];
}

class ImportTransactionsService {
  async execute({ importFilename }: Request): Promise<Transaction[]> {
    const importFilePath = path.join(uploadConfig.directory, importFilename);

    const ok = await checkHeader(importFilePath);

    if (!ok) {
      await fs.promises.unlink(importFilePath);
      throw new AppError("The header of the file isn't a format of import");
    }

    const transactionsImport = await loadCSV(importFilePath);

    const transactions = await execArrayInAsyncFunction(transactionsImport);

    return transactions;
  }
}

export default ImportTransactionsService;
