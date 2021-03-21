import {Picker} from '@react-native-picker/picker';
import React, {useState, useCallback} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  TextInputProps,
  useWindowDimensions,
} from 'react-native';

import {Container, TextInput, InputLabel, PickerContainer} from './styles';

interface InputProps extends TextInputProps {
  error?: boolean;
  icon?: string;
  containerStyle?: object;
  label?: string;
  onValueChange?: (itemValue: any, itemIndex: number) => void;
  picker?: boolean;
  pickerList?: Array<{
    value: string;
    id: string;
  }>;
}

export interface InputRef extends TextInputProps {
  focus(): void;
}

const Input: React.FC<InputProps> = ({
  icon,
  containerStyle,
  error,
  value,
  label,
  onValueChange,
  style,
  pickerList,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [containerWidth, setContainerWidth] = useState('70%');

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const windowDimensions = useWindowDimensions();

  return (
    <Container
      style={pickerList && !error ? {borderBottomWidth: 0} : containerStyle}
      isFocused={isFocused}
      isErrored={!!error}
      isFilled={!!value}>
      {label && <InputLabel>{label}</InputLabel>}

      {!pickerList && (
        <TextInput
          style={style}
          value={value}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      )}

      {pickerList && (
        <PickerContainer
          pickerWidth={windowDimensions.width / 1.5 + 'px'}
          selectedValue={value}
          onValueChange={onValueChange}>
          {pickerList.map(({value, id}) => (
            <Picker.Item color="#5636d3" key={id} label={value} value={value} />
          ))}
        </PickerContainer>
      )}
    </Container>
  );
};

export default Input;
