import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export type AccountType = 'ENTRADA/SAIDA' | 'SAIDA' | 'ENTRADA';

export interface Account {
  id: string;
  value: string;
  type: AccountType;
}

export interface AccountsContextProps {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => Promise<boolean>;
  removeAccount: (id: string) => Promise<boolean>;
  changeAccount: (account: Account) => Promise<boolean>;
}

export const AccountsContext = createContext<AccountsContextProps | null>(
  null,
);

const AccountsProvider: React.FC = ({children}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('gofinances@accounts').then(
      (storageAccounts) => {
        if (storageAccounts) {
          const loadAccounts: Account[] = JSON.parse(storageAccounts);
          setAccounts([...loadAccounts]);
        }
      },
    );
  }, []);

  const addAccount = useCallback(
    async (account: Omit<Account, 'id'>): Promise<boolean> => {
      const {value,type} = account;
      const lastIndex = accounts.length - 1;
      const lastAccount = accounts[lastIndex];
      const newIndex = lastAccount ? Number(lastAccount.id) + 1 : 0;
      const id = String(newIndex);
      const newAccount: Account = {
        id,
        value: value.toUpperCase(),
        type,
      };

      const newAccounts = [...accounts, newAccount];

      await AsyncStorage.setItem(
        'gofinances@accounts',
        JSON.stringify(newAccounts),
      );

      setAccounts(newAccounts);

      return true;
    },
    [accounts],
  );

  const changeAccount = useCallback(
    async (account: Account): Promise<boolean> => {
      const {id, value} = account;
      const newAccounts = [...accounts];
      const index = newAccounts.findIndex(
        (account) => account.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newAccounts[index] = {
        ...account,
        value: value.toUpperCase(),
      };

      await AsyncStorage.setItem(
        'gofinances@accounts',
        JSON.stringify(newAccounts),
      );

      setAccounts(newAccounts);

      return true;
    },
    [accounts],
  );

  const removeAccount = useCallback(
    async (id: string): Promise<boolean> => {
      const newAccounts = [...accounts];
      const index = newAccounts.findIndex(
        (account) => account.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newAccounts.splice(index, 1);

      await AsyncStorage.setItem(
        'gofinances@accounts',
        JSON.stringify(newAccounts),
      );

      setAccounts(newAccounts);
      return true;
    },
    [accounts],
  );

  const provider: AccountsContextProps = React.useMemo(
    () => ({
      accounts,
      addAccount,
      changeAccount,
      removeAccount,
    }),
    [accounts, addAccount, changeAccount, removeAccount],
  );

  return (
    <AccountsContext.Provider value={provider}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
