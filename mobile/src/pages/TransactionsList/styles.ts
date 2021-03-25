import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface PrimaryColor {
  primaryColor: string;
}

interface SecundaryColor {
  secundaryColor: string;
}

export const ListTansactionsContainer = styled.ScrollView`
  padding-top: 8px;
  width: 100%;
`;

export const Icon = styled(FeatherIcon)`
  justify-content: center;
  align-items: center;
  width: 40px;
`;

export const ListBottonSpace = styled.View`
  height: 80px;
`;
