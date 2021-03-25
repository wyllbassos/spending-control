import React, {useCallback, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';

import {useRegisters, useThemes} from '../../hooks';
import {Container} from '../../styles';
import {ListRecordContainer, ListBottonSpace} from './styles';

import {Alert} from 'react-native';

const RegisterList: React.FC = () => {
  const navigation = useNavigation();

  const {
    theme: {secundaryColor, tercearyColor},
  } = useThemes();

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
    <Container backgroundColor={tercearyColor}>
      <ListRecordContainer contentInset={{bottom: 100}}>
        {list.map((register) => (
          <ListItem
            key={register.id}
            text={register.value}
            buttonTrash={{onPress: () => handleDeleteRegister(register.id)}}
            buttonEdit={{onPress: () => handleSelectRegister(register.id)}}
          />
        ))}
        <ListBottonSpace />
      </ListRecordContainer>

      <Button
        onPress={() => navigation.navigate('Register-form')}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icons name="plus" size={32} color={secundaryColor} />
      </Button>
    </Container>
  );
};

export default RegisterList;
