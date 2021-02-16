import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
      }}
      name="Dashboard"
      component={Dashboard}
    />
  </App.Navigator>
);

export default AppRoutes;
