import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Button from '../../components/Button';
import {RegisterKeys} from '../../hooks/registers';
import {useRegisters, useThemes} from '../../hooks';

import {Container} from '../../styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const {
    theme: {tercearyColor},
  } = useThemes();

  const {setSelectedRegister} = useRegisters();

  const handleRegister = useCallback(
    (register: RegisterKeys) => {
      setSelectedRegister(register);
      navigation.navigate('Register-list');
    },
    [navigation],
  );

  return (
    <Container
      backgroundColor={tercearyColor}
      style={{paddingHorizontal: 16, paddingVertical: 8}}>
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
