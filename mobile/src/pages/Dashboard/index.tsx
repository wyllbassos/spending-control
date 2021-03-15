import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';

import {Container, ButtonMenu, TextButtonMenu} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const handleChangePage = useCallback(
    (route: string) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  return (
    <Container>
      <ButtonMenu onPress={() => handleChangePage('AddTransaction')}>
        <TextButtonMenu>Adicionar Transação</TextButtonMenu>
      </ButtonMenu>

      <ButtonMenu onPress={() => handleChangePage('Transactions')}>
        <TextButtonMenu>Lista de Transações</TextButtonMenu>
      </ButtonMenu>

      <ButtonMenu onPress={() => handleChangePage('Registers')}>
        <TextButtonMenu>Cadastros</TextButtonMenu>
      </ButtonMenu>
    </Container>
  );
};

export default Dashboard;
