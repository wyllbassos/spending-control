import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';

import {Container, MenuContainer, ButtonMenu, TextButtonMenu} from './styles';

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
      <MenuContainer>
        <ButtonMenu onPress={() => handleChangePage('AddTransaction')}>
          <TextButtonMenu>Adicionar Transação</TextButtonMenu>
        </ButtonMenu>

        <ButtonMenu onPress={() => handleChangePage('Transactions')}>
          <TextButtonMenu>Lista de Transações</TextButtonMenu>
        </ButtonMenu>
      </MenuContainer>

      <MenuContainer>
        <ButtonMenu onPress={() => handleChangePage('Registers')}>
          <TextButtonMenu>Cadastros</TextButtonMenu>
        </ButtonMenu>
      </MenuContainer>
    </Container>
  );
};

export default Dashboard;
