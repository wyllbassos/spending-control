import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useRegister } from '../hooks/register';

import { Container } from './styles';

const ListRegisters: React.FC = () => {
  const {
    registers,
    deleteRegister,
    setUpdating,
    setTitle,
    setId,
  } = useRegister();

  return (
    <Container>
      <li>
        <span>Cadastros</span>
      </li>
      {registers.map(register => {
        return (
          <li key={register.id}>
            <FiEdit
              onClick={() => {
                setUpdating(true);
                setTitle(register.title);
                setId(register.id);
              }}
            />
            <FiTrash2
              onClick={() => {
                deleteRegister(register.id);
              }}
            />
            <span>{register.title}</span>
          </li>
        );
      })}
    </Container>
  );
};

export default ListRegisters;
