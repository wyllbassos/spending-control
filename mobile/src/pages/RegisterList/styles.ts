import styled from 'styled-components/native';

interface ListRecordButtonrops {
  backgroundColor: string;
}

interface ListRegisterTextProps {
  color: string;
}

export const ListRecordContainer = styled.ScrollView`
  padding-top: 8px;
  width: 100%;
`;

export const ListRecordButton = styled.View<ListRecordButtonrops>`
  flex-direction: row;
  align-items: center;
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  margin: 8px 16px;
  border-radius: 2px;
`;

export const ListRegisterText = styled.Text<ListRegisterTextProps>`
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

export const ListBottonSpace = styled.View`
  height: 80px;
`;
