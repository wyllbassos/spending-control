import React from 'react';
import {View, StatusBar} from 'react-native';
import {useThemes} from '..//hooks';

import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const {
    theme: {primaryColor},
  } = useThemes();

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={primaryColor === '#FFF' ? 'dark-content' : 'light-content'}
        backgroundColor={primaryColor}
      />
      <AppRoutes />
    </View>
  );
};

export default Routes;
