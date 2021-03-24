import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface PrimaryColor {
  primaryColor: string;
}

interface SecundaryColor {
  secundaryColor: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  align-items: center;
`;

export const ListTansactionsContainer = styled.ScrollView`
  padding-top: 8px;
  width: 100%;
`;

export const Transaction = styled.TouchableOpacity<SecundaryColor>`
  flex-direction: row;
  flex: 1;
  background-color: ${({secundaryColor}) => secundaryColor};
  margin: 8px 16px;
  border-radius: 2px;
  align-items: center;
`;

export const TransactionData = styled.View<SecundaryColor>`
  flex: 1;
  background-color: ${({secundaryColor}) => secundaryColor};
  margin: 8px 16px;
  border-radius: 2px;
`;

export const TransactionExpand = styled.TouchableOpacity<SecundaryColor>`
  flex-direction: row;
  flex: 1;
  background-color: ${({secundaryColor}) => secundaryColor};
  margin: 8px 16px;
  border-radius: 2px;
  align-items: center;
`;

export const TransactionText = styled.Text<PrimaryColor>`
  flex: 1;
  margin: 0 16px;
  font-size: 20px;
  color: ${({primaryColor}) => primaryColor};
`;

export const Icon = styled(FeatherIcon)`
  justify-content: center;
  align-items: center;
  width: 40px;
`;

export const ListBottonSpace = styled.View`
  height: 80px;
`;
