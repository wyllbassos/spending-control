import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/Feather';

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

export const TextContainer = styled.View`
  flex: 1;
  margin: 8px 0 8px 16px;
`;

export const TextItem = styled.Text<{color?: string}>`
  ${({color}) => (color ? `color: ${color};` : '')}
  ${({color}) => (color ? 'padding: 0px 8px;' : '')}
  font-size: ${({color}) => (color ? '24px;' : '16px;')};
`;

export const ValueContainer = styled.View`
  align-items: center;
  flex-direction: row;
  height: 36px;
`;

export const IconValue = styled(AntDesign)``;

export const Icon = styled(AntDesign)`
  justify-content: center;
  align-items: center;
  width: 40px;
`;

export const ListBottonSpace = styled.View`
  height: 80px;
`;
