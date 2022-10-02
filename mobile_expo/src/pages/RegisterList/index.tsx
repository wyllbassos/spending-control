import React, {useCallback, useEffect, useMemo} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';

import {useAccounts, useRegisters, useThemes} from '../../hooks';
import {Container} from '../../styles';
import {ListRecordContainer, ListBottonSpace} from './styles';

import {Alert} from 'react-native';
import { RootStackParamList } from 'src/types';

const RegisterList: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    theme: {secundaryColor, tercearyColor},
  } = useThemes();

  const {
    registers,
    selectedRegister,
    removeRegister,
    registerDescriptions,
  } = useRegisters();

  const {accounts, removeAccount} = useAccounts();

  const list = useMemo(() => {
    if (selectedRegister === 'accounts') return accounts;

    return registers[selectedRegister]
  }, [accounts, registers, selectedRegister]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: registerDescriptions.plural,
    });
  }, []);

  const handleSelectRegister = useCallback(
    (registerId: string) => {
      navigation.navigate('Register-form', {registerId});
    },
    [navigation],
  );

  const handleDeleteRegister = useCallback(
    (id: string) => {
      const registerValue = list.find((register) => register.id === id)?.value;

      Alert.alert(
        'Atenção',
        registerValue ? `Deseja deletar o registro ${registerValue}` : 'Erro registro nao encontrado',
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Sim',
            onPress: async () => {
              if (selectedRegister === 'accounts')
                await removeAccount(id);
              else
                await removeRegister(id);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => '',
        },
      );
    },
    [selectedRegister, list],
  );

  return (
    <Container backgroundColor={tercearyColor}>
      <ListRecordContainer contentInset={{bottom: 100}}>
        {list.map(({id, value, type}) => (
          <ListItem
            key={id}
            text={`${value}${type ? `\n${type}` : ''}`}
            buttonTrash={{onPress: () => handleDeleteRegister(id)}}
            buttonEdit={{onPress: () => handleSelectRegister(id)}}
          />
        ))}
        <ListBottonSpace />
      </ListRecordContainer>

      <Button
        onPress={() => navigation.navigate('Register-form', {})}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icons name="plus" size={32} color={secundaryColor} />
      </Button>
    </Container>
  );
};

export default RegisterList;
