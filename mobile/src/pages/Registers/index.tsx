import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';

import {Container, ButtonMenu, TextButtonMenu} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const handleRegister = useCallback(
    (register: string) => {
      navigation.navigate(register);
    },
    [navigation],
  );

  return (
    <Container>
      <ButtonMenu onPress={() => handleRegister('payment-modes')}>
        <TextButtonMenu>Formas de Pagamentos</TextButtonMenu>
      </ButtonMenu>

      <ButtonMenu onPress={() => handleRegister('categories')}>
        <TextButtonMenu>Categoria</TextButtonMenu>
      </ButtonMenu>

      <ButtonMenu onPress={() => handleRegister('sub-categories')}>
        <TextButtonMenu>Sub Categoria</TextButtonMenu>
      </ButtonMenu>
    </Container>
  );
};

export default Dashboard;
