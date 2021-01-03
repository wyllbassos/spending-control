import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../../../services/api';

export interface Register {
  title: string;
  id: string;
}

// interface RegisterState {}

interface RegisterContextData {
  title: string;
  id: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  titleDescription: string;
  setTitleDescription: React.Dispatch<React.SetStateAction<string>>;
  registers: Register[];
  updating: boolean;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  updateRegister: () => Promise<void>;
  updateRegisters: () => Promise<void>;
  deleteRegister: (id: string) => Promise<void>;
  insertRegister: () => Promise<void>;
}

const RegisterContext = createContext<RegisterContextData>(
  {} as RegisterContextData,
);

interface RegisterProviderProps {
  children: React.ReactNode;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
}: RegisterProviderProps) => {
  const [titleRegister, setTitleRegister] = useState('');
  const [idTitleRegister, setIdTitleRegister] = useState('');
  const [urlRegister, setUrlRegister] = useState('sub-categories');
  const [titleDescription, setTitleDescription] = useState('Sub Categoria');
  const [registers, setRegisters] = useState<Register[]>([]);
  const [updating, setUpdating] = useState(false);

  const updateRegisters = useCallback(async () => {
    const response = await api.get<Register[]>(urlRegister);
    const { data } = response;
    setRegisters(data);
  }, [urlRegister]);

  useEffect(() => {
    updateRegisters();
  }, [updateRegisters]);

  const insertRegister = useCallback(async () => {
    await api.post(`/${urlRegister}`, { title: titleRegister });
    await updateRegisters();
    setTitleRegister('');
  }, [titleRegister, urlRegister, updateRegisters]);

  const updateRegister = useCallback(async () => {
    try {
      await api.put(`${urlRegister}/${idTitleRegister}`, {
        title: titleRegister,
      });
      setUpdating(false);
      setTitleRegister('');
      await updateRegisters();
    } catch (error) {
      // console.log(error.response);
      if (error.response.data.message) alert(error.response.data.message);
    }
  }, [titleRegister, urlRegister, idTitleRegister, updateRegisters]);

  const deleteRegister = useCallback(
    async (id: string): Promise<void> => {
      try {
        await api.delete(`${urlRegister}/${id}`);
        await updateRegisters();
      } catch (error) {
        // console.log(error.response);
        if (error.response.data.message) alert(error.response.data.message);
      }
    },
    [urlRegister, updateRegisters],
  );

  const registerContextData: RegisterContextData = {
    id: idTitleRegister,
    setId: setIdTitleRegister,
    title: titleRegister,
    setTitle: setTitleRegister,
    url: urlRegister,
    setUrl: setUrlRegister,
    insertRegister,
    titleDescription,
    setTitleDescription,
    registers,
    updateRegisters,
    deleteRegister,
    updating,
    setUpdating,
    updateRegister,
  };

  return (
    <RegisterContext.Provider value={registerContextData}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextData => {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error('useRegister must be used withn a RegisterProvider');
  }

  return context;
};
