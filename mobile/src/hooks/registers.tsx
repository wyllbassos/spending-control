import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
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

interface RegistersContext {
  registers: Registers;
  addRegister: (
    registerName: RegisterKeys,
    register: Register,
  ) => Promise<void>;
  removeRegister: (
    registerName: RegisterKeys,
    registerId: string,
  ) => Promise<void>;
}

const RegistersContext = createContext<RegistersContext | null>(null);

const RegistersProvider: React.FC = ({children}) => {
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

  const addRegister = useCallback(
    async (registerName: RegisterKeys, register: Register): Promise<void> => {
      const newRegisters = {
        ...registers,
        [registerName]: [...registers[registerName], register],
      };

      await AsyncStorage.setItem(
        'gofinances@registers',
        JSON.stringify(newRegisters),
      );

      setRegisters(newRegisters);
    },
    [registers],
  );

  const removeRegister = useCallback(
    async (registerName: RegisterKeys, registerId: string): Promise<void> => {
      let deleteRegister = false;
      const newRegistersToDelete = [...registers[registerName]];
      const index = newRegistersToDelete.findIndex(
        (register) => register.id === registerId,
      );

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return;
      }

      newRegistersToDelete.splice(index, 1);

      const newRegisters = {
        ...registers,
        [registerName]: newRegistersToDelete,
      };

      await AsyncStorage.setItem(
        'gofinances@registers',
        JSON.stringify(newRegisters),
      );

      setRegisters(newRegisters);
    },
    [registers],
  );

  const value = React.useMemo(
    () => ({registers, addRegister, removeRegister}),
    [registers, addRegister, removeRegister],
  );

  return (
    <RegistersContext.Provider value={value}>
      {children}
    </RegistersContext.Provider>
  );
};

function useRegisters(): RegistersContext {
  const context = useContext(RegistersContext);

  if (!context) {
    throw new Error(`useRegisters must be used within a RegistersProvider`);
  }

  return context;
}

export {RegistersProvider, useRegisters};
