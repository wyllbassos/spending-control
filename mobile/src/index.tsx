import 'react-native-gesture-handler';
import React from 'react';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Routes />
    </AppContainer>
  );
};

export default App;
