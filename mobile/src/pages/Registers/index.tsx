import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Button from '../../components/Button';
import {RegisterKeys} from '../../hooks/registers';
import {useRegisters} from '../../hooks';

import {Container} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const {setSelectedRegister} = useRegisters();

  const handleRegister = useCallback(
    (register: RegisterKeys) => {
      setSelectedRegister(register);
      navigation.navigate('Register-list');
    },
    [navigation],
  );

  return (
    <Container>
      <Button
        text="Formas de Pagamentos"
        onPress={() => handleRegister('payment-modes')}
      />

      <Button text="Categorias" onPress={() => handleRegister('categories')} />

      <Button
        text="Sub Categorias"
        onPress={() => handleRegister('sub-categories')}
      />
    </Container>
  );
};

export default Dashboard;
