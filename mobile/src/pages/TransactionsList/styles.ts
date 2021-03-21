import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  align-items: center;
`;

export const ListTansactionsContainer = styled.ScrollView`
  padding-top: 8px;
  width: 100%;
`;

export const TransactionButton = styled.View`
  flex: 1;
  background-color: #fff;
  margin: 8px 16px;
  border-radius: 2px;
`;

export const TransactionText = styled.Text`
  flex: 1;
  margin: 8px 0 8px 16px;
  font-size: 20px;
  color: #5636d3;
`;

export const ContainerIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;

export const ListBottonSpace = styled.View`
  height: 80px;
`;
