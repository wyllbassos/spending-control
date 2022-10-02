import styled from 'styled-components/native';

// export const primaryColor = '#5636d3';
// export const secundaryColor = '#FF872C';
// export const tercearyColor = '#ebeef8';

// export const primaryColor = '#5636d3';
// export const secundaryColor = '#FFF';
// export const tercearyColor = '#ebeef8';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor};
`;
