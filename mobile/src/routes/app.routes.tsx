import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import TransactionsList from '../pages/TransactionsList';
import Registers from '../pages/Registers';
import RegisterForm from '../pages/RegisterForm';
import TransactionForm from '../pages/TransactionForm';
import RegisterList from '../pages/RegisterList';

import Logo from '../components/logo';
import {useThemes} from '../hooks';

const App = createStackNavigator();

const headerTitleDashboard = (props: any) => <Logo {...props} />;

const appScreens = [
  {
    key: 0,
    headerTitle: headerTitleDashboard,
    name: 'Dashboard',
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
  return (
    <App.Navigator initialRouteName="Dashboard">
      {appScreens.map((screen) => (
        <App.Screen
          key={screen.key}
          options={{
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTintColor: !!screen.key ? secundaryColor : undefined,
            headerTitle: !!screen.key
              ? screen.headerTitle
              : () => (
                  <Logo
                    secundaryColor={secundaryColor}
                    tercearyColor={tercearyColor}
                  />
                ),
          }}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </App.Navigator>
  );
};

export default AppRoutes;
