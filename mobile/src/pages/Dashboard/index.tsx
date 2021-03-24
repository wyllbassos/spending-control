import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Container} from '../../styles';
import Button from '../../components/Button';
import {useThemes} from '../../hooks';

// import {Container} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const {
    theme: {tercearyColor},
  } = useThemes();

  const handleChangePage = useCallback(
    (route: string) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  return (
    <Container
      backgroundColor={tercearyColor}
      style={{paddingHorizontal: 16, paddingVertical: 8}}>
      <Button
        text="Transações"
        onPress={() => handleChangePage('Transactions')}
      />

      <Button text="Cadastros" onPress={() => handleChangePage('Registers')} />
    </Container>
  );
};

export default Dashboard;
