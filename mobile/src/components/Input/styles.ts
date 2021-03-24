import {Picker} from '@react-native-picker/picker';
import styled, {css} from 'styled-components/native';

interface PrimaryColor {
  primaryColor: string;
}
interface ContainerProps extends PrimaryColor {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

interface PickerProps extends PrimaryColor {
  pickerWidth: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  margin: 8px 0;

  border-bottom-width: 2px;
  border-bottom-color: ${({isErrored, isFocused, isFilled, primaryColor}) =>
    isErrored ? '#c53030' : isFocused || isFilled ? 'green' : primaryColor};
`;

export const TextInput = styled.TextInput<PrimaryColor>`
  padding: 8px 0px;
  color: ${({primaryColor}) => primaryColor};
  font-size: 24px;
`;

export const InputLabel = styled.Text<PrimaryColor>`
  color: ${({primaryColor}) => primaryColor};
`;

export const PickerContainer = styled(Picker)<PickerProps>`
  width: ${(props) => props.pickerWidth};
  transform: scale(1.5);
  color: ${({primaryColor}) => primaryColor};
  align-self: center;
`;

export const DatePickerContainer = styled.View`
  flex-direction: row;
`;
