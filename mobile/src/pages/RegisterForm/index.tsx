import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useAccounts, useRegisters, useThemes} from '../../hooks';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {Container} from '../../styles';
import { Register } from 'src/hooks/registers';
import { AccountType } from 'src/hooks/accounts';

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

  const {accounts, addAccount, changeAccount} = useAccounts();

  // const [inputValue, setInputValue] = useState('');
  // const [typeValue, setTypeValue] = useState<'ENTRADA/SAIDA' | 'SAIDA' | 'ENTRADA' | undefined>(selectedRegister === 'accounts' ? 'ENTRADA/SAIDA' : undefined);
  const [register, setRegister] = useState<Register>({
    id: '',
    value: '',
    type: selectedRegister === 'accounts' ? 'ENTRADA/SAIDA' : undefined,
  })
  const [error, setError] = useState<string>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: registerDescriptions.plural,
    });
  }, []);

  useEffect(() => {
    if (!!error) setError(undefined);
  }, [register]);

  const list = useMemo(() => {
    if (selectedRegister === 'accounts') return accounts;

    return registers[selectedRegister]
  }, [accounts, registers, selectedRegister]);

  useEffect(() => {
    if (registerId) {
      const register = list.find(r => r.id === registerId);

      if (register) {
        setRegister(register);
      }
    }
  }, [registerId, list]);

  // const selectedRegisterRecordId = useMemo(() => {
  //   if (registerId) {
  //     const register = list.find(r => r.id === registerId);

  //     if (register) {
  //       // setInputValue(register.value);
  //       // if (register.type !== undefined)
  //       //   setTypeValue(register.type);
  //     }

  //     return register;
  //   }
  //   return undefined;
  // }, [registerId]);

  const handleCheckInputValue = useCallback(() => {
    const {value, type} = register;
    if (!value) {
      const errorText = 'Nome deve ser preenchido.';
      Alert.alert('Erro ao Cadastrar', errorText);
      setError(errorText);
      return false;
    }

    if (selectedRegister === 'accounts' && type === undefined) {
      const errorText = 'Tipo deve ser preenchido.';
      Alert.alert('Erro ao Cadastrar', errorText);
      setError(errorText);
      return false;
    }

    return true;
  }, [register, selectedRegister]);

  const handleAddRegister = useCallback(async () => {
    if (!handleCheckInputValue()) {
      return;
    }

    let ok = false;
    if (selectedRegister === 'accounts')
      if (register.type) {
        ok = await addAccount({
          value: register.value,
          type: register.type,
        });
      } else {
        Alert.alert('Tipo nao definido');
      }
    else
      ok = await addRegister(register);

    if (ok) navigation.goBack();
    else Alert.alert('Erro ao incluir');
  }, [handleCheckInputValue, addRegister, register, navigation, selectedRegister]);

  const handleChangeRegister = useCallback(async () => {
    if (!handleCheckInputValue()) {
      return;
    }

    if (register.id === '') {
      Alert.alert('Não Selecionado Registro para Alterar');
      return;
    }

    let ok = false;
    if (selectedRegister === 'accounts')
      if (register.type)
        ok = await changeAccount({
          ...register,
          type: register.type,
        });
      else
        Alert.alert('Tipo nao definido');
    else
      ok = await changeRegister(register);

    if (ok) navigation.goBack();
    else Alert.alert('erro ao alterar');
  }, [
    handleCheckInputValue,
    selectedRegister,
    changeRegister,
    register,
    navigation,
  ]);

  return (
    <Container backgroundColor={tercearyColor} style={{padding: 16}}>
      <Input
        label={`Nome da ${registerDescriptions.singular}:`}
        value={register.value}
        error={!!error}
        onChangeText={value => setRegister(s => ({...s, value}))}
      />

      {selectedRegister === 'accounts' && (
        <Input
          type="picker"
          label={'Tipo:'}
          value={register.type}
          error={!!error}
          onValueChange={(type: AccountType) => setRegister(s => ({...s, type}))}
          // onChangeText={(type: AccountType) => setRegister(s => ({...s, type}))}
          pickerList={[
            {value: 'ENTRADA/SAIDA', id: '0'},
            {value: 'ENTRADA', id: '1'},
            {value: 'SAIDA', id: '2'},
          ]}
        />
      )}

      {register.id === '' && (
        <Button text="Cadastrar" onPress={handleAddRegister} />
      )}

      {register.id !== '' && (
        <Button text="Alterar" onPress={handleChangeRegister} />
      )}
    </Container>
  );
};

export default RegisterForm;
