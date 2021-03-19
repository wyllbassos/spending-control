import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {Register, RegisterKeys, useRegisters} from '../../hooks/registers';

import {
  Container,
  InputRegisterContainer,
  InputRegisterText,
  InputRegister,
  ButtonToRegister,
  ButtonsContainer,
  ButtonChange,
  ButtonDelete,
  ButtonCancel,
  TextButtonSubmit,
  RegisterList,
  RegisterContainer,
  RegisterText,
} from './styles';

const registerDescriptions: any = {
  'payment-modes': 'Forma de Pagamento',
  categories: 'Categoria',
  'sub-categories': 'Sub-Categoria',
};

const RegisterForm: React.FC<{registerName: RegisterKeys}> = ({
  registerName,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedRegisterId, setSelectedRegisterId] = useState<
    undefined | string
  >();

  const {addRegister, registers, removeRegister} = useRegisters();

  const list = useMemo(() => registers[registerName], [
    registers,
    registerName,
  ]);

  const handleSelectRegister = useCallback((register: Register) => {
    setSelectedRegisterId(register.id);
    setInputValue(register.value);
  }, []);

  const handleUnSelectRegister = useCallback(() => {
    setSelectedRegisterId(undefined);
    setInputValue('');
  }, []);

  const handleRegister = useCallback(() => {
    if (selectedRegisterId) {
      return;
    }

    const lastIndex = list.length - 1;
    const lastRegister = list[lastIndex];
    const newIndex = lastRegister ? Number(lastRegister.id) + 1 : 0;
    const id = String(newIndex);
    const register = {id, value: inputValue};
    addRegister(registerName, register);
    setInputValue('');
  }, [list, inputValue]);

  const handleDeleteRegister = useCallback(() => {
    if (selectedRegisterId === undefined) {
      return;
    }

    const index = list.findIndex(
      (register) => register.id === selectedRegisterId,
    );

    Alert.alert(
      'Atenção',
      `Deseja deletar o registro ${list[index].value}`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: () => {
            removeRegister(registerName, selectedRegisterId);
            handleUnSelectRegister();
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => '',
      },
    );
  }, [registerName, selectedRegisterId, list]);

  return (
    <Container>
      <InputRegisterContainer>
        <InputRegisterText>{`Descrição da ${registerDescriptions[registerName]}:`}</InputRegisterText>
        <InputRegister
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
        />
      </InputRegisterContainer>

      {selectedRegisterId === undefined && (
        <ButtonToRegister onPress={handleRegister}>
          <TextButtonSubmit>Cadastrar</TextButtonSubmit>
        </ButtonToRegister>
      )}

      {selectedRegisterId !== undefined && (
        <>
          <ButtonsContainer>
            <ButtonChange onPress={handleRegister}>
              <TextButtonSubmit>Alterar</TextButtonSubmit>
            </ButtonChange>
            <ButtonDelete onPress={handleDeleteRegister}>
              <TextButtonSubmit>Deletar</TextButtonSubmit>
            </ButtonDelete>
          </ButtonsContainer>
          <ButtonCancel onPress={handleUnSelectRegister}>
            <TextButtonSubmit>Cancelar</TextButtonSubmit>
          </ButtonCancel>
        </>
      )}

      <RegisterList
        data={list}
        keyExtractor={(register) => register.id}
        ListHeaderComponent={<InputRegisterText>Lista</InputRegisterText>}
        renderItem={({item: register}) => (
          <RegisterContainer onPress={() => handleSelectRegister(register)}>
            <RegisterText>{register.value}</RegisterText>
          </RegisterContainer>
        )}
      />
    </Container>
  );
};

export default RegisterForm;
