import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { FinaceProvider } from './finance';

const AppProvider: React.FC = ({ children }) => {
  return (
    <FinaceProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </FinaceProvider>
  );
};

export default AppProvider;
