import styled from 'styled-components/native';
interface ContainerProps {
  circle?: string;
  backgroundColor: string;
}

interface ButtonTextProps {
  color: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${(props) => props.circle || '92%'};
  height: ${(props) => props.circle || 'auto'};
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: ${(props) => (props.circle ? '0%' : '8% 4% 0% 4%')};
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${(props) => props.circle || '2px'};
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({color}) => color};
  font-size: 24px;
`;
