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

export type RegisterKeys = 'payment-modes' | 'categories' | 'sub-categories';

export interface Register {
  id: string;
  value: string;
}

export interface Registers {
  'payment-modes': Register[];
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
  addRegister: (value: string) => Promise<boolean>;
  removeRegister: (id: string) => Promise<boolean>;
  changeRegister: (id: string, value: string) => Promise<boolean>;
}

export const RegistersContext = createContext<RegistersContextProps | null>(
  null,
);

const RegistersProvider: React.FC = ({children}) => {
  const [selectedRegister, setSelectedRegister] = useState<RegisterKeys>(
    'payment-modes',
  );

  const [registers, setRegisters] = useState<Registers>({
    'payment-modes': [],
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
        : selectedRegister === 'payment-modes'
        ? {singular: 'Forma de Pagamento', plural: 'Formas de Pagamento'}
        : {singular: 'Sub Categoria', plural: 'Sub Categorias'},
    [selectedRegister],
  );

  const addRegister = useCallback(
    async (value: string): Promise<boolean> => {
      const list = registers[selectedRegister];

      const lastIndex = list.length - 1;
      const lastRegister = list[lastIndex];
      const newIndex = lastRegister ? Number(lastRegister.id) + 1 : 0;
      const id = String(newIndex);
      const record = {id, value: value.toUpperCase()};
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
    async (id: string, value: string): Promise<boolean> => {
      const newRegistersToDelete = [...registers[selectedRegister]];
      const index = newRegistersToDelete.findIndex(
        (register) => register.id === id,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      newRegistersToDelete[index].value = value.toUpperCase();

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
