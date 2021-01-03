import React from 'react';
import { useRegister } from '../hooks/register';
import { Container } from './styles';

const ButtonsSelectRegister: React.FC = () => {
  const { registers, indexRegister, setIndexRegister } = useRegister();

  return (
    <Container>
      {registers.map((register, index) => {
        return (
          <button
            key={register.url}
            className={index === indexRegister ? 'selected' : ''}
            type="button"
            onClick={() => setIndexRegister(index)}
          >
            {register.description}
          </button>
        );
      })}
    </Container>
  );
};

export default ButtonsSelectRegister;
