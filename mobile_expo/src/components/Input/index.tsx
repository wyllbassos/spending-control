import {Picker} from '@react-native-picker/picker';
import React, {useState, useCallback, useMemo} from 'react';
import {TextInputProps, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  TextInput,
  InputLabel,
  PickerContainer,
  DatePickerContainer,
} from './styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {useThemes} from '../../hooks';

interface InputProps extends TextInputProps {
  type?: 'text' | 'picker' | 'datePicker';
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
  onChangeDate?: (date: Date) => void;
  datePickerValue?: Date;
}

export interface InputRef extends TextInputProps {
  focus(): void;
}

const Input: React.FC<InputProps> = ({
  children,
  icon,
  containerStyle,
  error,
  value,
  label,
  onValueChange,
  style,
  pickerList,
  type,
  onChangeDate,
  datePickerValue,
  ...rest
}) => {
  const {
    theme: {primaryColor},
  } = useThemes();

  const [isFocused, setIsFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const windowDimensions = useWindowDimensions();

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker((status) => !status);
  }, []);

  const selectedDate = useMemo(() => {
    const localDate = datePickerValue || new Date();
    return {
      string: format(localDate, 'dd/MM/yyyy'),
      date: localDate,
    };
  }, [datePickerValue]);

  return (
    <Container
      primaryColor={primaryColor}
      style={pickerList && !error ? {borderBottomWidth: 0} : containerStyle}
      isFocused={isFocused}
      isErrored={!!error}
      isFilled={!!value}>
      {label && <InputLabel primaryColor={primaryColor}>{label}</InputLabel>}

      {children}

      {(type === 'text' || !type) && (
        <>
          <TextInput
            primaryColor={primaryColor}
            style={style}
            value={value}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
        </>
      )}

      {pickerList && type === 'picker' && (
        <PickerContainer
          primaryColor={primaryColor}
          pickerWidth={windowDimensions.width / 1.5 + 'px'}
          selectedValue={value}
          onValueChange={onValueChange}>
          {pickerList.map(({value, id}) => (
            <Picker.Item
              color={primaryColor}
              key={id}
              label={value}
              value={value}
            />
          ))}
        </PickerContainer>
      )}

      {type === 'datePicker' && (
        <DatePickerContainer>
          <Icon
            name="calendar"
            color={primaryColor}
            size={32}
            onPress={handleOpenDatePicker}
            style={{margin: 8}}
          />
          <TextInput
            primaryColor={primaryColor}
            editable={false}
            value={datePickerValue ? selectedDate.string : ''}
          />
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              onChange={(e: any, date: Date | undefined) => {
                setShowDatePicker(false);
                onChangeDate && date && onChangeDate(date);
              }}
              display={'calendar'}
              value={selectedDate.date}
            />
          )}
        </DatePickerContainer>
      )}
    </Container>
  );
};

export default Input;
