import React, {
  SelectHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface Options {
  value: string | number;
  text: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ComponentType<IconBaseProps>;
  error?: string;
  defaultValue?: any;
  options?: Options[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  icon: Icon,
  error,
  defaultValue,
  options,
  children,
  ...rest
}: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  // const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // console.log(error, fieldName, registerField);
  return (
    <>
      {label && <span>{label}</span>}
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon size={20} />}
        <select
          onFocus={handleSelectFocus}
          onBlur={handleSelectBlur}
          defaultValue={defaultValue}
          ref={selectRef}
          {...rest}
        >
          {options &&
            options.map(option => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          {children}
        </select>
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Select;
