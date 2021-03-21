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

const AppProvider: React.FC = ({children}) => {
  return (
    <RegistersProvider>
      <TransactionsProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </TransactionsProvider>
    </RegistersProvider>
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

export const useRegisters = (): RegistersContextProps => {
  const context = useContext(RegistersContext);

  if (!context) {
    throw new Error(`useRegisters must be used within a RegistersProvider`);
  }

  return context;
};

export default AppProvider;
