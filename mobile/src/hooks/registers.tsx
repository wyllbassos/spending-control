import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export type RegisterKeys = 'accounts' | 'categories' | 'sub-categories';

export interface Register {
  id: string;
  value: string;
  type?: 'ENTRADA/SAIDA' | 'SAIDA' | 'ENTRADA';
}

export interface Registers {
  'accounts': Register[];
  categories: Register[];
  'sub-categories': Register[];
}

export interface RegistersContextProps {
  selectedRegister: RegisterKeys;
  setSelectedRegister: React.Dispatch<React.SetStateAction<RegisterKeys>>;
  registerDescriptions: {
    singular: string;
    plural: string;
  };
  registers: Registers;
  addRegister: (newRegister: Omit<Register, 'id'>) => Promise<boolean>;
  removeRegister: (id: string) => Promise<boolean>;
  changeRegister: (newRegister: Register) => Promise<boolean>;
}

export const RegistersContext = createContext<RegistersContextProps | null>(
  null,
);

const RegistersProvider: React.FC = ({children}) => {
  const [selectedRegister, setSelectedRegister] = useState<RegisterKeys>(
    'accounts',
  );

  const [registers, setRegisters] = useState<Registers>({
    'accounts': [],
    categories: [],
    'sub-categories': [],
  });

  useEffect(() => {
    AsyncStorage.getItem('gofinances@registers').then((storageRegisters) => {
      if (storageRegisters) {
        setRegisters(JSON.parse(storageRegisters));
      }
    });
  }, []);

  const registerDescriptions = useMemo(
    () =>
      selectedRegister === 'categories'
        ? {singular: 'Categoria', plural: 'Categorias'}
        : selectedRegister === 'accounts'
        ? {singular: 'Conta', plural: 'Contas'}
        : {singular: 'Sub Categoria', plural: 'Sub Categorias'},
    [selectedRegister],
  );

  const addRegister = useCallback(
    async (newRegister): Promise<boolean> => {
      const {value, type} = newRegister;
      const list = registers[selectedRegister];

      const lastIndex = list.length - 1;
      const lastRegister = list[lastIndex];
      const newIndex = lastRegister ? Number(lastRegister.id) + 1 : 0;
      const id = String(newIndex);
      const record = {id, value: value.toUpperCase(), type};
      const newRegisters = {
        ...registers,
        [selectedRegister]: [...list, record],
      };

      await AsyncStorage.setItem(
        'gofinances@registers',
        JSON.stringify(newRegisters),
      );

      setRegisters(newRegisters);

      return true;
    },
    [registers, selectedRegister],
  );

  const changeRegister = useCallback(
    async (newRegister: Register): Promise<boolean> => {
      const {id, value, type} = newRegister;
      const newRegistersToEdit = [...registers[selectedRegister]];
      const index = newRegistersToEdit.findIndex(
        (register) => register.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newRegistersToEdit[index].value = value.toLocaleUpperCase();
      newRegistersToEdit[index].type = type;

      const newRegisters = {
        ...registers,
        [selectedRegister]: newRegistersToEdit,
      };

      await AsyncStorage.setItem(
        'gofinances@registers',
        JSON.stringify(newRegisters),
      );

      setRegisters(newRegisters);

      return true;
    },
    [registers, selectedRegister],
  );

  const removeRegister = useCallback(
    async (id: string): Promise<boolean> => {
      const newRegistersToDelete = [...registers[selectedRegister]];
      const index = newRegistersToDelete.findIndex(
        (register) => register.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newRegistersToDelete.splice(index, 1);

      const newRegisters = {
        ...registers,
        [selectedRegister]: newRegistersToDelete,
      };

      await AsyncStorage.setItem(
        'gofinances@registers',
        JSON.stringify(newRegisters),
      );

      setRegisters(newRegisters);
      return true;
    },
    [registers, selectedRegister],
  );

  const value: RegistersContextProps = React.useMemo(
    () => ({
      registers,
      addRegister,
      changeRegister,
      removeRegister,
      selectedRegister,
      setSelectedRegister,
      registerDescriptions,
    }),
    [
      registers,
      addRegister,
      changeRegister,
      removeRegister,
      selectedRegister,
      setSelectedRegister,
      registerDescriptions,
    ],
  );

  return (
    <RegistersContext.Provider value={value}>
      {children}
    </RegistersContext.Provider>
  );
};

export default RegistersProvider;
