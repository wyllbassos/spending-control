import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Container} from '../../styles';
import Button from '../../components/Button';
import {useThemes} from '../../hooks';

// import {Container} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const {theme, handleChangeTheme} = useThemes();

  const handleChangePage = useCallback(
    (route: string) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  return (
    <Container
      backgroundColor={theme.tercearyColor}
      style={{paddingHorizontal: 16, paddingVertical: 8}}>
      <Button
        text="Transações"
        onPress={() => handleChangePage('Transactions')}
      />

      <Button text="Cadastros" onPress={() => handleChangePage('Registers')} />

      <Button text="Thema-0" onPress={() => handleChangeTheme(0)} />
      <Button text="Thema-1" onPress={() => handleChangeTheme(1)} />
      <Button text="Thema-2" onPress={() => handleChangeTheme(2)} />
      <Button text="Thema-3" onPress={() => handleChangeTheme(3)} />
      <Button text="Thema-4" onPress={() => handleChangeTheme(4)} />
      <Button text="Thema-5" onPress={() => handleChangeTheme(5)} />
    </Container>
  );
};

export default Dashboard;
