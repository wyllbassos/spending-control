import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';

import {useRegisters} from '../../hooks';

import {
  Container,
  ListRecordContainer,
  ListRecordButton,
  ListRegisterText,
  ListBottonSpace,
  ContainerIcon,
} from './styles';
import {Alert} from 'react-native';

const RegisterList: React.FC = () => {
  const navigation = useNavigation();

  const {
    registers,
    selectedRegister,
    removeRegister,
    registerDescriptions,
  } = useRegisters();

  const list = useMemo(() => registers[selectedRegister], [
    registers,
    selectedRegister,
  ]);

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
    (id) => {
      const index = list.findIndex((register) => register.id === id);

      Alert.alert(
        'Atenção',
        `Deseja deletar o registro ${list[index].value}`,
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Sim',
            onPress: async () => {
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
    <Container>
      <ListRecordContainer contentInset={{bottom: 100}}>
        {list.map((register) => (
          <ListRecordButton key={register.id} style={{elevation: 2}}>
            <ListRegisterText>{register.value}</ListRegisterText>
            <ContainerIcon onPress={() => handleSelectRegister(register.id)}>
              <Icons name="edit" size={24} color="#5636d3" />
            </ContainerIcon>
            <ContainerIcon onPress={() => handleDeleteRegister(register.id)}>
              <Icons name="trash-2" size={24} color="#5636d3" />
            </ContainerIcon>
          </ListRecordButton>
        ))}
        <ListBottonSpace />
      </ListRecordContainer>

      <Button
        onPress={() => navigation.navigate('Register-form')}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icons name="plus" size={32} color="#FFF" />
      </Button>
    </Container>
  );
};

export default RegisterList;
