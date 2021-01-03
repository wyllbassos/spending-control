import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../../../services/api';

export interface Record {
  title: string;
  id: string;
}

interface Register {
  url: string;
  description: string;
}

const registers = [
  { url: 'sub-categories', description: 'Sub Categoria' },
  { url: 'categories', description: 'Categoria' },
  { url: 'payment-modes', description: 'Forma de Pagamento' },
];

interface RegisterContextData {
  title: string;
  id: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  records: Record[];
  updating: boolean;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  deleting: boolean;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  registers: Register[];
  indexRegister: number;
  setIndexRegister: (index: number) => void;
  updateRegister: () => Promise<void>;
  deleteRegister: () => Promise<void>;
  insertRegister: () => Promise<void>;
  resetValues: () => void;
}

const RegisterContext = createContext<RegisterContextData>(
  {} as RegisterContextData,
);

interface RegisterProviderProps {
  children: React.ReactNode;
}

interface UpdateBackend {
  method: 'delete' | 'put' | 'post';
  id: string;
  url: string;
  title: string;
}

const stringStackUpdateBackend = localStorage.getItem(
  '@GoFinaces:stackUpdateBackend',
);

let stackUpdateBackend: UpdateBackend[] = !stringStackUpdateBackend
  ? []
  : JSON.parse(stringStackUpdateBackend);

// console.log(stackUpdateBackend);
const executeStackUpdateBackend = async (): Promise<(Record | undefined)[]> => {
  const promises = stackUpdateBackend.map(async updateBackend => {
    const { method, title, url } = updateBackend;
    if (method === 'post') {
      try {
        const record = (await api.post(url, { title })).data as Record;
        return record;
      } catch (error) {
        console.log(error);
      }
    }
    return undefined;
  });
  const responseAll = await Promise.all(promises);
  stackUpdateBackend = [];
  localStorage.removeItem('@GoFinaces:stackUpdateBackend');
  return responseAll;
};

const setRecordsLocalStorage = (
  indexRegister: number,
  records: Record[],
): void => {
  localStorage.setItem(
    `@GoFinaces:records-${indexRegister}`,
    JSON.stringify(records),
  );
};

const getRecordsLocalStorage = (indexRegister: number): Record[] => {
  const newRecordsString = localStorage.getItem(
    `@GoFinaces:records-${indexRegister}`,
  );
  if (newRecordsString) {
    const newRecords = JSON.parse(newRecordsString);
    return newRecords;
  }
  return [];
};

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
}: RegisterProviderProps) => {
  const [idRecord, setIdRecord] = useState('');
  const [titleRecord, setTitleRecord] = useState('');
  const [indexRegister, setIndexRegister] = useState(0);
  // const [register, setRegister] = useState(registers[0]);
  const [records, setRecords] = useState<Record[]>([]);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateRegisters = useCallback(async () => {
    try {
      const response = await api.get<Record[]>(registers[indexRegister].url);
      const { data } = response;
      setRecordsLocalStorage(indexRegister, data);
      setRecords(data);
      if (stackUpdateBackend.length) {
        const ret = await executeStackUpdateBackend();
        console.log(ret);
        updateRegisters();
      }
    } catch (error) {
      setRecords(getRecordsLocalStorage(indexRegister));
    }
  }, [indexRegister]);

  useEffect(() => {
    updateRegisters();
  }, [updateRegisters]);

  const resetValues = useCallback(async (): Promise<void> => {
    setUpdating(false);
    setDeleting(false);
    setIdRecord('');
    setTitleRecord('');
  }, []);

  const handleChangeRegister = useCallback(
    (id: number) => {
      if (registers[id]) {
        setIndexRegister(id);
        resetValues();
      }
    },
    [setIndexRegister, resetValues],
  );

  const insertRegister = useCallback(async () => {
    try {
      await api.post(`/${registers[indexRegister].url}`, {
        title: titleRecord,
      });
      await updateRegisters();
      resetValues();
    } catch (error) {
      const { config, response, message } = error;
      const { url } = config;
      // console.log(error.toJSON());
      // console.log(error.config);
      if (message === 'Network Error') {
        const existsRecordTitle = records.findIndex(
          ({ title }) => title === titleRecord,
        );
        if (existsRecordTitle === -1) {
          const newRecords: Record[] = [
            ...records,
            { id: titleRecord, title: titleRecord },
          ].sort((a, b) => (a.title > b.title ? 1 : -1));
          setRecords(newRecords);
          setRecordsLocalStorage(indexRegister, newRecords);
          resetValues();
          stackUpdateBackend.push({
            id: idRecord,
            method: 'post',
            title: titleRecord,
            url,
          });
          localStorage.setItem(
            '@GoFinaces:stackUpdateBackend',
            JSON.stringify(stackUpdateBackend),
          );
        } else {
          alert('Está descrição já Existe');
        }
      }

      if (response.data.message) alert(response.data.message);
    }
  }, [
    titleRecord,
    indexRegister,
    updateRegisters,
    resetValues,
    records,
    idRecord,
  ]);

  const updateRegister = useCallback(async () => {
    try {
      await api.put(`${registers[indexRegister].url}/${idRecord}`, {
        title: titleRecord,
      });
      resetValues();
      await updateRegisters();
    } catch (error) {
      // console.log(error.response);
      if (error.response.data.message) alert(error.response.data.message);
    }
  }, [titleRecord, indexRegister, idRecord, updateRegisters, resetValues]);

  const deleteRegister = useCallback(async (): Promise<void> => {
    try {
      await api.delete(`${registers[indexRegister].url}/${idRecord}`);
      await updateRegisters();
    } catch (error) {
      const { config, response, message } = error;
      const { url } = config;
      // console.log(error.toJSON());
      // console.log(error.config);
      if (message === 'Network Error') {
        const newRecords = [...records];
        const indexRemove = newRecords.findIndex(({ id }) => id === idRecord);
        if (indexRemove > -1) {
          newRecords.splice(indexRemove, 1);
          setRecords(newRecords);
          setRecordsLocalStorage(indexRegister, newRecords);
          stackUpdateBackend.push({
            id: idRecord,
            method: 'delete',
            title: titleRecord,
            url,
          });
        }
        console.log(stackUpdateBackend);
      }

      if (response.data.message) alert(response.data.message);
    }
    console.log('ok');
    resetValues();
  }, [
    indexRegister,
    updateRegisters,
    idRecord,
    resetValues,
    records,
    titleRecord,
  ]);

  const registerContextData: RegisterContextData = {
    id: idRecord,
    setId: setIdRecord,
    title: titleRecord,
    setTitle: setTitleRecord,
    insertRegister,
    records,
    deleteRegister,
    updating,
    setUpdating,
    updateRegister,
    deleting,
    setDeleting,
    resetValues,
    indexRegister,
    setIndexRegister: handleChangeRegister,
    registers,
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
