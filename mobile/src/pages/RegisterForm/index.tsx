import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';

import {
  Container,
  InputRegister,
  ButtonSubmit,
  TextButtonSubmit,
} from './styles';

const RegisterForm: React.FC<{register: string}> = ({register}) => {
  const navigation = useNavigation();

  const handleRegister = useCallback(
    (register: string) => {
      navigation.navigate(register);
    },
    [navigation],
  );

  return (
    <Container>
      <InputRegister placeholder="Descrição" />
      <ButtonSubmit style={{backgroundColor: 'green'}}>
        <TextButtonSubmit>Cadastrar</TextButtonSubmit>
      </ButtonSubmit>
    </Container>
  );
};

export default RegisterForm;
