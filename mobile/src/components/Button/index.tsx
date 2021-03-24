import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {useThemes} from '../../hooks';

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
  const {
    theme: {primaryColor, secundaryColor},
  } = useThemes();

  return (
    <Container
      backgroundColor={primaryColor}
      {...props}
      circle={circle}
      style={style || {elevation: 8}}>
      <ButtonText color={secundaryColor}>
        {text}
        {children}
      </ButtonText>
    </Container>
  );
};

export default Button;
