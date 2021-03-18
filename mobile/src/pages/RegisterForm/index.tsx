import React, {useCallback, useMemo, useState} from 'react';
import {RegisterKeys, useRegisters} from '../../hooks/registers';

import {
  Container,
  InputRegisterContainer,
  InputRegisterText,
  InputRegister,
  ButtonSubmit,
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

  // const [list, setList] = useState<Register[]>([
  //   {id: '0', value: 'Cartão 1'},
  //   {id: '1', value: 'Cartão 2'},
  //   {id: '2', value: 'Dinheiro'},
  // ]);

  const {addRegister, registers} = useRegisters();

  const list = useMemo(() => registers[registerName], [
    registers,
    registerName,
  ]);

  const handleRegister = useCallback(() => {
    // setList((current) => [
    //   ...current,
    //   {id: current.length.toString(), value: inputValue},
    // ]);
    const id = list.length.toString();
    const register = {id, value: inputValue};
    addRegister(registerName, register);
  }, [list, inputValue]);

  return (
    <Container>
      <InputRegisterContainer>
        <InputRegisterText>{`Descrição da ${registerDescriptions[registerName]}:`}</InputRegisterText>
        <InputRegister
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
        />
      </InputRegisterContainer>
      <ButtonSubmit style={{backgroundColor: 'green'}} onPress={handleRegister}>
        <TextButtonSubmit>Cadastrar</TextButtonSubmit>
      </ButtonSubmit>

      <RegisterList
        data={list}
        keyExtractor={(register) => register.id}
        ListHeaderComponent={<InputRegisterText>Lista</InputRegisterText>}
        renderItem={({item: register}) => (
          <RegisterContainer>
            <RegisterText>{register.value}</RegisterText>
          </RegisterContainer>
        )}
      />
    </Container>
  );
};

export default RegisterForm;
