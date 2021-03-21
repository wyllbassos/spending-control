import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Container, ButtonText} from './styles';

interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  circle?: string;
}

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  text,
  circle,
  ...props
}) => {
  return (
    <Container {...props} circle={circle} style={style || {elevation: 8}}>
      <ButtonText>
        {text}
        {children}
      </ButtonText>
    </Container>
  );
};

export default Button;
