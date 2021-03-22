import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  align-items: center;
`;

export const ListTansactionsContainer = styled.ScrollView`
  padding-top: 8px;
  width: 100%;
`;

export const Transaction = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  background-color: #fff;
  margin: 8px 16px;
  border-radius: 2px;
  align-items: center;
`;

export const TransactionData = styled.View`
  flex: 1;
  background-color: #fff;
  margin: 8px 16px;
  border-radius: 2px;
`;

export const TransactionExpand = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  background-color: #fff;
  margin: 8px 16px;
  border-radius: 2px;
  align-items: center;
`;

export const TransactionText = styled.Text`
  flex: 1;
  margin: 0 16px;
  font-size: 20px;
  color: #5636d3;
`;

export const Icon = styled(FeatherIcon)`
  justify-content: center;
  align-items: center;
  width: 40px;
`;

export const ListBottonSpace = styled.View`
  height: 80px;
`;
