import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Button from '../../components/Button';

import {Container} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const handleChangePage = useCallback(
    (route: string) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  return (
    <Container>
      <Button
        text="Transações"
        onPress={() => handleChangePage('Transactions')}
      />

      <Button text="Cadastros" onPress={() => handleChangePage('Registers')} />
    </Container>
  );
};

export default Dashboard;
