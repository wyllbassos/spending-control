import 'react-native-gesture-handler';
import React from 'react';

import Routes from './src/routes';
import AppContainer from './src/hooks';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Routes />
    </AppContainer>
  );
};

export default App;
