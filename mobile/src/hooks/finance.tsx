import React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
  } from 'react';
  
  import AsyncStorage from '@react-native-community/async-storage';
  
  interface FinaceContext {
    addMsg(msg: string): () => Promise<void>;
  }
  
  const FinaceContext = createContext<FinaceContext | null>(null);
  
  const FinaceProvider: React.FC = ({ children }) => {
    const [msgs, setMsgs] = useState<string[]>([]);
    useEffect(() => {
      AsyncStorage.getItem('gofinances@msgs').then(storageMsgs => {
        if (storageMsgs) {
          setMsgs(JSON.parse(storageMsgs));
        }
      });
    }, []);
  
    const addMsg = useCallback(async (msg: string): Promise<void> => {
      const newMsgs = [...msgs, msg];
      AsyncStorage.setItem('gofinances@msgs', JSON.stringify(newMsgs));
    },
    [msgs],
    );
  
    const value = React.useMemo(
      () => ({ addMsg }),
      [addMsg],
    );
  
    return <FinaceContext.Provider value={value}>{children}</FinaceContext.Provider>;
  };
  
  function useFinace(): FinaceContext {
    const context = useContext(FinaceContext);
  
    if (!context) {
      throw new Error(`useFinace must be used within a FinaceProvider`);
    }
  
    return context;
  }
  
  export { FinaceProvider, useFinace };
  