import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Button from '../../components/Button';
import {RegisterKeys} from '../../hooks/registers';
import {useRegisters, useThemes} from '../../hooks';

import {Container} from '../../styles';
import {RootStackParamList} from '../../types';

const Dashboard: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    theme: {tercearyColor},
  } = useThemes();

  const {setSelectedRegister} = useRegisters();

  const handleRegister = useCallback(
    (register: RegisterKeys) => {
      setSelectedRegister(register);
      navigation.navigate('Register-list', {});
    },
    [navigation, setSelectedRegister],
  );

  return (
    <Container
      backgroundColor={tercearyColor}
      style={{paddingHorizontal: 16, paddingVertical: 8}}>
      <Button text="Contas" onPress={() => handleRegister('accounts')} />

      <Button text="Categorias" onPress={() => handleRegister('categories')} />

      <Button
        text="Sub Categorias"
        onPress={() => handleRegister('sub-categories')}
      />
    </Container>
  );
};

export default Dashboard;
