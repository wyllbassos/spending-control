import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import TransactionsList from '../pages/TransactionsList';
import Registers from '../pages/Registers';
import RegisterForm from '../pages/RegisterForm';
import TransactionForm from '../pages/TransactionForm';
import RegisterList from '../pages/RegisterList';

import Logo from '../components/logo';
import {useThemes} from '../hooks';

const App = createStackNavigator();

const Tab = createBottomTabNavigator();

const headerTitleDashboard = (props: any) => <Logo {...props} />;

const appScreens = [
  {
    key: 0,
    headerTitle: 'Temas',
    name: 'Themes',
    component: Dashboard,
  },
  {
    key: 1,
    headerTitle: 'Transações',
    name: 'Transactions',
    component: TransactionsList,
  },
  {
    key: 2,
    headerTitle: 'Transações',
    name: 'Transaction-form',
    component: TransactionForm,
  },
  {
    key: 3,
    headerTitle: 'Cadastros',
    name: 'Registers',
    component: Registers,
  },
  {
    key: 4,
    headerTitle: 'Lista',
    name: 'Register-list',
    component: RegisterList,
  },
  {
    key: 5,
    headerTitle: 'Cadastro',
    name: 'Register-form',
    component: RegisterForm,
  },
];

const AppRoutes: React.FC = () => {
  const {
    theme: {primaryColor, secundaryColor, tercearyColor},
  } = useThemes();

  const NavigatorRegisters = () => (
    <App.Navigator initialRouteName={appScreens[3].name}>
      <App.Screen
        key={appScreens[3].key}
        options={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: secundaryColor,
          headerTitle: appScreens[3].headerTitle,
        }}
        name={appScreens[3].name}
        component={appScreens[3].component}
      />
      <App.Screen
        key={appScreens[4].key}
        options={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: secundaryColor,
          headerTitle: appScreens[4].headerTitle,
        }}
        name={appScreens[4].name}
        component={appScreens[4].component}
      />
      <App.Screen
        key={appScreens[5].key}
        options={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: secundaryColor,
          headerTitle: appScreens[5].headerTitle,
        }}
        name={appScreens[5].name}
        component={appScreens[5].component}
      />
    </App.Navigator>
  );

  const NavigatorTransactions = () => (
    <App.Navigator initialRouteName={appScreens[1].name}>
      <App.Screen
        key={appScreens[1].key}
        options={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: secundaryColor,
          headerTitle: appScreens[1].headerTitle,
        }}
        name={appScreens[1].name}
        component={appScreens[1].component}
      />
      <App.Screen
        key={appScreens[2].key}
        options={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: secundaryColor,
          headerTitle: appScreens[2].headerTitle,
        }}
        name={appScreens[2].name}
        component={appScreens[2].component}
      />
    </App.Navigator>
  );

  const NavigatorThemes = () => (
    <App.Navigator initialRouteName={appScreens[0].name}>
      <App.Screen
        key={appScreens[0].key}
        options={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: secundaryColor,
          headerTitle: appScreens[0].headerTitle,
        }}
        name={appScreens[0].name}
        component={appScreens[0].component}
      />
    </App.Navigator>
  );

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen key="Transactions" name="Transações" component={NavigatorTransactions} />
      <Tab.Screen key="Registers" name="Cadastros" component={NavigatorRegisters} />
      <Tab.Screen key="Temes" name="Temas" component={NavigatorThemes} />
    </Tab.Navigator>
  );
};

export default AppRoutes;
