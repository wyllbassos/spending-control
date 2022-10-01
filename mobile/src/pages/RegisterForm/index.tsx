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

  const {
    addRegister,
    changeRegister,
    registers,
    selectedRegister,
    registerDescriptions,
  } = useRegisters();

  const [inputValue, setInputValue] = useState('');
  const [typeValue, setTypeValue] = useState<'ENTRADA/SAIDA' | 'SAIDA' | 'ENTRADA' | undefined>(selectedRegister === 'accounts' ? 'ENTRADA/SAIDA' : undefined);
  const [error, setError] = useState<string>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: registerDescriptions.plural,
    });
  }, []);

  useEffect(() => {
    if (!!error) setError(undefined);
  }, [inputValue, typeValue]);

  const list = useMemo(() => registers[selectedRegister], [
    registers,
    selectedRegister,
  ]);

  const selectedRegisterRecordId = useMemo(() => {
    if (registerId) {
      const selectedRegister = list.find((item) => item.id === registerId);

      if (selectedRegister) {
        setInputValue(selectedRegister.value);
        if (selectedRegister.type !== undefined)
          setTypeValue(selectedRegister.type);
      }
      return registerId;
    }
    return undefined;
  }, [registerId]);

  const handleCheckInputValue = useCallback(() => {
    if (!inputValue) {
      const errorText = 'Nome deve ser preenchido.';
      Alert.alert('Erro ao Cadastrar', errorText);
      setError(errorText);
      return false;
    }

    if (selectedRegister === 'accounts' && typeValue === undefined) {
      const errorText = 'Tipo deve ser preenchido.';
      Alert.alert('Erro ao Cadastrar', errorText);
      setError(errorText);
      return false;
    }

    return true;
  }, [inputValue, typeValue, selectedRegister]);

  const handleAddRegister = useCallback(async () => {
    if (!handleCheckInputValue()) {
      return;
    }

    const ok = await addRegister({value: inputValue, type: typeValue});

    if (ok) navigation.goBack();
    else Alert.alert('erro ao incluir');
  }, [handleCheckInputValue, addRegister, inputValue, typeValue, navigation]);

  const handleChangeRegister = useCallback(async () => {
    if (!handleCheckInputValue()) {
      return;
    }

    if (!selectedRegisterRecordId) {
      Alert.alert('Não Selecionado Registro para Alterar');
      return;
    }

    const ok = await changeRegister({
      id: selectedRegisterRecordId,
      value: inputValue,
      type: typeValue,
    });

    if (ok) navigation.goBack();
    else Alert.alert('erro ao alterar');
  }, [
    handleCheckInputValue,
    selectedRegisterRecordId,
    changeRegister,
    inputValue,
    navigation,
  ]);

  return (
    <Container backgroundColor={tercearyColor} style={{padding: 16}}>
      <Input
        label={`Nome da ${registerDescriptions.singular}:`}
        value={inputValue}
        error={!!error}
        onChangeText={setInputValue}
      />

      {typeValue && (
        <Input
          type="picker"
          label={'Tipo:'}
          value={typeValue}
          error={!!error}
          onValueChange={setTypeValue}
          pickerList={[
            {value: 'ENTRADA/SAIDA', id: '0'},
            {value: 'ENTRADA', id: '1'},
            {value: 'SAIDA', id: '2'},
          ]}
        />
      )}

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
