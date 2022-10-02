import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import { ReactFCProps } from 'src/types';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  origin_account_id: string;
  destination_account_id: string;
  category_id: string;
  sub_category_id: string;
  transaction_date: Date;
  execution_date?: Date;
}

export interface TransactionsContextProps {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<boolean>;
  removeTransaction: (id: string) => Promise<boolean>;
  changeTransaction: (transaction: Transaction) => Promise<boolean>;
}

export const TransactionsContext = createContext<TransactionsContextProps | null>(
  null,
);

const TransactionsProvider: React.FC<ReactFCProps> = ({children}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('gofinances@transactions').then(
      (storageTransactions) => {
        if (storageTransactions) {
          const loadTransactions: Transaction[] = JSON.parse(
            storageTransactions,
          ).map((loadTransaction: Transaction): Transaction => {
            const {value, transaction_date, execution_date} = loadTransaction;
            return {
              ...loadTransaction,
              value: !value ? 0 : Number(value),
              transaction_date: transaction_date ? new Date(transaction_date) : new Date(),
              execution_date: execution_date ? new Date(execution_date) : undefined,
            };
          });
          setTransactions([...loadTransactions]);
        }
      },
    );
  }, []);

  const addTransaction = useCallback(
    async (transaction: Omit<Transaction, 'id'>): Promise<boolean> => {
      const {description} = transaction;
      const lastIndex = transactions.length - 1;
      const lastTransaction = transactions[lastIndex];
      const newIndex = lastTransaction ? Number(lastTransaction.id) + 1 : 0;
      const id = String(newIndex);
      const newTransaction: Transaction = {
        ...transaction,
        id,
        description: description.toUpperCase(),
      };
      const newTransactions = [...transactions, newTransaction];

      await AsyncStorage.setItem(
        'gofinances@transactions',
        JSON.stringify(newTransactions),
      );

      setTransactions(newTransactions);

      return true;
    },
    [transactions],
  );

  const changeTransaction = useCallback(
    async (transaction: Transaction): Promise<boolean> => {
      const {id, description} = transaction;
      const newTransactions = [...transactions];
      const index = newTransactions.findIndex(
        (transaction) => transaction.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newTransactions[index] = {
        ...transaction,
        description: description.toUpperCase(),
      };

      await AsyncStorage.setItem(
        'gofinances@transactions',
        JSON.stringify(newTransactions),
      );

      setTransactions(newTransactions);

      return true;
    },
    [transactions],
  );

  const removeTransaction = useCallback(
    async (id: string): Promise<boolean> => {
      const newTransactions = [...transactions];
      const index = newTransactions.findIndex(
        (transaction) => transaction.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newTransactions.splice(index, 1);

      await AsyncStorage.setItem(
        'gofinances@transactions',
        JSON.stringify(newTransactions),
      );

      setTransactions(newTransactions);
      return true;
    },
    [transactions],
  );

  const provider: TransactionsContextProps = React.useMemo(
    () => ({
      transactions,
      addTransaction,
      changeTransaction,
      removeTransaction,
    }),
    [transactions, addTransaction, changeTransaction, removeTransaction],
  );

  return (
    <TransactionsContext.Provider value={provider}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
