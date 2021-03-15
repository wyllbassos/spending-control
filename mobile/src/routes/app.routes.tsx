import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import ListTransactions from '../pages/ListTransactions';
import Registers from '../pages/Registers';
import AddTransaction from '../pages/AddTransaction';

import Logo from '../components/logo';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: {backgroundColor: '#EBEEF8'},
    }}
    initialRouteName="Dashboard">
    <App.Screen
      options={{
        headerStyle: {
          backgroundColor: '#5636d3',
        },
        headerTitle: (props) => <Logo {...props} />,
      }}
      name="Dashboard"
      component={Dashboard}
    />

    <App.Screen
      options={{
        headerStyle: {
          backgroundColor: '#5636d3',
        },
        headerTintColor: '#EBEEF8',
        headerTitle: 'Lista de Transações',
      }}
      name="Transactions"
      component={ListTransactions}
    />

    <App.Screen
      options={{
        headerStyle: {
          backgroundColor: '#5636d3',
        },
        headerTintColor: '#EBEEF8',
        headerTitle: 'Cadastros',
      }}
      name="Registers"
      component={Registers}
    />

    <App.Screen
      options={{
        headerStyle: {
          backgroundColor: '#5636d3',
        },
        headerTintColor: '#EBEEF8',
        headerTitle: 'Adicionar Transação',
      }}
      name="AddTransaction"
      component={AddTransaction}
    />
  </App.Navigator>
);

export default AppRoutes;
