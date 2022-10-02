import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

interface TextProps {
  color: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  margin: 8px 16px;
  border-radius: 2px;
  elevation: 4;
`;

export const Text = styled.Text<TextProps>`
  flex: 1;
  margin: 8px 0 8px 16px;
  font-size: 20px;
  color: ${({color}) => color};
`;

export const ContainerIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 100%;
`;
