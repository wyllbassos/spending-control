import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export interface ThemeProps {
  id: string;
  primaryColor: string;
  secundaryColor: string;
  tercearyColor: string;
}

interface ThemesStorageProps {
  storageThemes: ThemeProps[];
  storageSelectedTheme: number;
}

export interface ThemesContextProps {
  theme: ThemeProps;
  themes: ThemeProps[];
  addTheme: (theme: Omit<ThemeProps, 'id'>) => Promise<boolean>;
  changeTheme: (theme: ThemeProps) => Promise<boolean>;
  removeTheme: (id: string) => Promise<boolean>;
  selectedTheme: number;
  handleChangeTheme: (id: number) => Promise<void>;
}

export const ThemesContext = createContext<ThemesContextProps | null>(null);

const defautThemes: ThemeProps[] = [
  {
    id: '0',
    primaryColor: '#5636d3',
    secundaryColor: '#FFF',
    tercearyColor: '#ebeef8',
  },
  {
    id: '1',
    primaryColor: '#FF872C',
    secundaryColor: '#000',
    tercearyColor: '#ebeef8',
  },
  {
    id: '2',
    primaryColor: '#F00',
    secundaryColor: '#FFF',
    tercearyColor: '#ebeef8',
  },
  {
    id: '3',
    primaryColor: '#000',
    secundaryColor: '#FFF',
    tercearyColor: '#ebeef8',
  },
  {
    id: '4',
    primaryColor: '#FFF',
    secundaryColor: '#000',
    tercearyColor: '#5636d3',
  },
  {
    id: '5',
    primaryColor: '#000',
    secundaryColor: '#FFF',
    tercearyColor: '#5636d3',
  },
];

const ThemesProvider: React.FC = ({children}) => {
  const [themes, setThemes] = useState<ThemeProps[]>(defautThemes);
  const [selectedTheme, setSelectedTheme] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('gofinances@themes').then((storageThemesStr) => {
      if (storageThemesStr) {
        const {storageSelectedTheme, storageThemes} = JSON.parse(
          storageThemesStr,
        ) as ThemesStorageProps;

        setSelectedTheme(Number(storageSelectedTheme));
        setThemes({...storageThemes});
      }
    });
  }, []);

  const addTheme = useCallback(
    async (theme: Omit<ThemeProps, 'id'>): Promise<boolean> => {
      const lastIndex = themes.length - 1;
      const lastTheme = themes[lastIndex];
      const newIndex = lastTheme ? Number(lastTheme.id) + 1 : 0;
      const id = String(newIndex);
      const newTheme: ThemeProps = {
        ...theme,
        id,
      };

      const storageThemes = [...themes, newTheme];

      await AsyncStorage.setItem(
        'gofinances@themes',
        JSON.stringify({
          storageThemes,
          storageSelectedTheme: selectedTheme,
        } as ThemesStorageProps),
      );

      setThemes(storageThemes);

      return true;
    },
    [themes, selectedTheme],
  );

  const changeTheme = useCallback(
    async (theme: ThemeProps): Promise<boolean> => {
      const {id} = theme;
      const storageThemes = [...themes];
      const index = storageThemes.findIndex((theme) => theme.id === id);

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      storageThemes[index] = {
        ...theme,
      };

      await AsyncStorage.setItem(
        'gofinances@themes',
        JSON.stringify({
          storageThemes,
          storageSelectedTheme: selectedTheme,
        } as ThemesStorageProps),
      );

      setThemes(storageThemes);

      return true;
    },
    [themes, selectedTheme],
  );

  const removeTheme = useCallback(
    async (id: string): Promise<boolean> => {
      if (themes.length === 1) {
        Alert.alert('Deve Existir ao menos um tema');
        return false;
      }

      const storageThemes = [...themes];
      const index = storageThemes.findIndex((theme) => theme.id === id);

      if (index === selectedTheme) {
        Alert.alert('Este tema está em uso');
        return false;
      }

      if (index < 0) {
        Alert.alert('Registro Não Localizado');
        return false;
      }

      storageThemes.splice(index, 1);

      await AsyncStorage.setItem(
        'gofinances@themes',
        JSON.stringify({
          storageThemes,
          storageSelectedTheme: selectedTheme,
        } as ThemesStorageProps),
      );

      setThemes(storageThemes);
      return true;
    },
    [themes, selectedTheme],
  );

  const handleChangeTheme = useCallback(
    async (index: number): Promise<void> => {
      setSelectedTheme(index);

      await AsyncStorage.setItem(
        'gofinances@themes',
        JSON.stringify({
          storageThemes: themes,
          storageSelectedTheme: index,
        } as ThemesStorageProps),
      );
    },
    [themes],
  );

  const value: ThemesContextProps = React.useMemo(
    () => ({
      theme: themes[selectedTheme],
      themes,
      addTheme,
      changeTheme,
      removeTheme,
      selectedTheme,
      handleChangeTheme,
    }),
    [
      themes,
      addTheme,
      changeTheme,
      removeTheme,
      selectedTheme,
      handleChangeTheme,
    ],
  );

  return (
    <ThemesContext.Provider value={value}>{children}</ThemesContext.Provider>
  );
};

export default ThemesProvider;
