import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RegistersProvider, {
  RegistersContext,
  RegistersContextProps,
} from './registers';

import TransactionsProvider, {
  TransactionsContext,
  TransactionsContextProps,
} from './transactions';

import ThemesProvider, {ThemesContext, ThemesContextProps} from './themes';
import AccountsProvider, { AccountsContext, AccountsContextProps } from './accounts';
import { ReactFCProps } from 'src/types';

const AppProvider: React.FC<ReactFCProps> = ({children}) => {
  return (
    <ThemesProvider>
      <RegistersProvider>
        <AccountsProvider>
          <TransactionsProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </TransactionsProvider>
        </AccountsProvider>
      </RegistersProvider>
    </ThemesProvider>
  );
};

export const useTransactions = (): TransactionsContextProps => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      `useTransactions must be used within a TransactionsProvider`,
    );
  }

  return context;
};

export const useAccounts = (): AccountsContextProps => {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error(
      `useTransactions must be used within a TransactionsProvider`,
    );
  }

  return context;
};

export const useRegisters = (): RegistersContextProps => {
  const context = useContext(RegistersContext);

  if (!context) {
    throw new Error(`useRegisters must be used within a RegistersProvider`);
  }

  return context;
};

export const useThemes = (): ThemesContextProps => {
  const context = useContext(ThemesContext);

  if (!context) {
    throw new Error(`useThemes must be used within a ThemesProvider`);
  }

  return context;
};

export default AppProvider;
