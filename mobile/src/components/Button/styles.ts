import styled from 'styled-components/native';

interface ContainerProps {
  circle?: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${(props) => props.circle || '100%'};
  height: ${(props) => props.circle || 'auto'};
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 8px 0;
  background-color: #5636d3;
  border-radius: ${(props) => props.circle || '4px'};
`;

export const ButtonText = styled.Text`
  color: #ebeef8;
  font-size: 24px;
`;
