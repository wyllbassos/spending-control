import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import ListTransactions from '../pages/ListTransactions';
import Registers from '../pages/Registers';
import RegisterForm from '../pages/RegisterForm';
import AddTransaction from '../pages/AddTransaction';

import Logo from '../components/logo';

const App = createStackNavigator();

const headerTitleDashboard = (props: any) => <Logo {...props} />;

const PaymentModesRegister = () => RegisterForm({register: 'payment-modes'});
const CategoriesRegister = () => RegisterForm({register: 'categories'});
const SubCategoriesRegister = () => RegisterForm({register: 'sub-categories'});

const appScreens = [
  {
    key: 0,
    headerTitle: headerTitleDashboard,
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    key: 1,
    headerTitle: 'Lista de Transações',
    name: 'Transactions',
    component: ListTransactions,
  },
  {
    key: 2,
    headerTitle: 'Adicionar Transação',
    name: 'AddTransaction',
    component: AddTransaction,
  },
  {
    key: 3,
    headerTitle: 'Cadastros',
    name: 'Registers',
    component: Registers,
  },
  {
    key: 4,
    headerTitle: 'Formas de Pagamento',
    name: 'payment-modes',
    component: PaymentModesRegister,
  },
  {
    key: 5,
    headerTitle: 'Categorias',
    name: 'categories',
    component: CategoriesRegister,
  },
  {
    key: 6,
    headerTitle: 'Sub Categorias',
    name: 'sub-categories',
    component: SubCategoriesRegister,
  },
];

const AppRoutes: React.FC = () => (
  <App.Navigator initialRouteName="Dashboard">
    {appScreens.map((screen) => (
      <App.Screen
        key={screen.key}
        options={{
          headerStyle: {
            backgroundColor: '#5636d3',
          },
          headerTintColor: !!screen.key ? '#EBEEF8' : undefined,
          headerTitle: screen.headerTitle,
        }}
        name={screen.name}
        component={screen.component}
      />
    ))}
  </App.Navigator>
);

export default AppRoutes;
