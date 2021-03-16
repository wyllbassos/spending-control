import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 24px;
`;

export const InputRegister = styled.TextInput`
  width: 100%;
  padding: 16px;
  background-color: #5636d3;
  color: #ebeef8;
  font-size: 16px;
`;

export const ButtonSubmit = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  margin: 24px 0;
  background-color: #5636d3;
  border-radius: 8px;
`;

export const TextButtonSubmit = styled.Text`
  color: #ebeef8;
  font-size: 24px;
`;
