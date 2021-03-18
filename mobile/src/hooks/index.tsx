import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RegistersProvider} from './registers';

const AppProvider: React.FC = ({children}) => {
  return (
    <RegistersProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </RegistersProvider>
  );
};

export default AppProvider;
