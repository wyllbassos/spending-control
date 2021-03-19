import {FlatList} from 'react-native';
import {Register} from 'src/hooks/registers';
import styled from 'styled-components/native';

// export const Container = styled.ScrollView`
//   flex: 1;
//   padding: 24px;
// `;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 24px;
`;

export const InputRegisterContainer = styled.View`
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-color: #5636d3;
  border-bottom-width: 2px;
`;

export const InputRegisterText = styled.Text`
  color: #5636d3;
`;

export const InputRegister = styled.TextInput`
  padding: 8px 16px;
  color: #5636d3;
  font-size: 24px;
`;

export const ButtonToRegister = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  background-color: green;
  border-radius: 8px;
`;

export const ButtonsContainer = styled.View`
  margin: 16px 0 0 0;
  flex-direction: row;
`;

export const ButtonChange = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  padding: 16px;
  border-top-left-radius: 8px;
  background-color: red;
  background-color: green;
`;

export const ButtonDelete = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  padding: 16px;
  border-top-right-radius: 8px;
  background-color: red;
`;

export const ButtonCancel = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #5636d3;
`;

export const TextButtonSubmit = styled.Text`
  color: #ebeef8;
  font-size: 24px;
`;

export const RegisterList = styled(FlatList as new () => FlatList<Register>)`
  width: 100%;
`;

export const RegisterContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #5636d3;
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 8px;
`;

export const RegisterText = styled.Text`
  font-size: 20px;
  color: #ebeef8;
`;
