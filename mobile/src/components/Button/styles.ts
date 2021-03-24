import styled from 'styled-components/native';
interface ContainerProps {
  circle?: string;
  backgroundColor: string;
}

interface ButtonTextProps {
  color: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${(props) => props.circle || '100%'};
  height: ${(props) => props.circle || 'auto'};
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 8px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${(props) => props.circle || '4px'};
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({color}) => color};
  font-size: 24px;
`;
