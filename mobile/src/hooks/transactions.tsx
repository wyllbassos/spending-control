import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  payment_form_id: string;
  category_id: string;
  sub_category_id: string;
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

const TransactionsProvider: React.FC = ({children}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('gofinances@transactions').then(
      (storageTransactions) => {
        if (storageTransactions) {
          setTransactions(JSON.parse(storageTransactions));
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
