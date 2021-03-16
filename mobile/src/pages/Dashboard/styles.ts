import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 16px 4%;
`;

export const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`;

export const ButtonMenu = styled.TouchableOpacity`
  width: 48%;
  height: 96px;
  padding: 16px;
  background-color: #5636d3;
  border-radius: 8px;
`;

export const TextButtonMenu = styled.Text`
  color: #ebeef8;
  font-size: 16px;
`;
