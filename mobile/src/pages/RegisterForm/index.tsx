import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useRegisters, useThemes} from '../../hooks';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {Container} from '../../styles';

interface RouteParams extends RouteProp<ParamListBase, string> {
  params: {
    registerId?: string;
  };
}

const RegisterForm: React.FC = () => {
  const {params} = useRoute<RouteParams>();
  const registerId = useMemo(() => params && params.registerId, [params]);

  const navigation = useNavigation();

  const {
    theme: {primaryColor, secundaryColor, tercearyColor},
  } = useThemes();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>();

  const {
    addRegister,
    changeRegister,
    registers,
    selectedRegister,
    registerDescriptions,
  } = useRegisters();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: registerDescriptions.plural,
    });
  }, []);

  useEffect(() => {
    if (!!error) setError(undefined);
  }, [inputValue]);

  const list = useMemo(() => registers[selectedRegister], [
    registers,
    selectedRegister,
  ]);

  const selectedRegisterRecordId = useMemo(() => {
    if (registerId) {
      const selectedRegister = list.find((item) => item.id === registerId);
      if (selectedRegister) {
        setInputValue(selectedRegister.value);
      }
      return registerId;
    }
    return undefined;
  }, [registerId]);

  const handleAddRegister = useCallback(async () => {
    if (!handleCheckInputValue()) {
      return;
    }

    const ok = await addRegister(inputValue);

    if (ok) navigation.goBack();
    else Alert.alert('erro ao incluir');
  }, [addRegister, inputValue, navigation]);

  const handleChangeRegister = useCallback(async () => {
    if (!handleCheckInputValue()) {
      return;
    }

    if (!selectedRegisterRecordId) {
      Alert.alert('Não Selecionado Registro para Alterar');
      return;
    }

    const ok = await changeRegister(selectedRegisterRecordId, inputValue);

    if (ok) navigation.goBack();
    else Alert.alert('erro ao alterar');
  }, [selectedRegisterRecordId, changeRegister, inputValue, navigation]);

  const handleCheckInputValue = useCallback(() => {
    if (!inputValue) {
      const errorText = 'Nome deve ser preenchido.';
      Alert.alert('Erro ao Cadastrar', errorText);
      setError(errorText);
      return false;
    }
    return true;
  }, [inputValue]);

  return (
    <Container backgroundColor={tercearyColor} style={{padding: 16}}>
      <Input
        label={`Nome da ${registerDescriptions.singular}:`}
        value={inputValue}
        error={!!error}
        onChangeText={setInputValue}
      />

      {!selectedRegisterRecordId && (
        <Button text="Cadastrar" onPress={handleAddRegister} />
      )}

      {!!selectedRegisterRecordId && (
        <Button text="Alterar" onPress={handleChangeRegister} />
      )}
    </Container>
  );
};

export default RegisterForm;
