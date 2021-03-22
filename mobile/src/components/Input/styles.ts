import {Picker} from '@react-native-picker/picker';
import styled, {css} from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

interface PickerProps {
  pickerWidth: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  margin: 8px 0;

  border-bottom-width: 2px;
  border-bottom-color: ${({isErrored, isFocused, isFilled}) =>
    isErrored ? '#c53030' : isFocused || isFilled ? 'green' : '#5636d3'};
`;

export const TextInput = styled.TextInput`
  padding: 8px 0px;
  color: #5636d3;
  font-size: 24px;
`;

export const InputLabel = styled.Text`
  color: #5636d3;
`;

export const PickerContainer = styled(Picker)<PickerProps>`
  width: ${(props) => props.pickerWidth};
  transform: scale(1.5);
  color: #5636d3;
  align-self: center;
`;

export const DatePickerContainer = styled.View`
  flex-direction: row;
`;
