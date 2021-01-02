import React, { useCallback } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Register } from '..';
import api from '../../../services/api';

import { Container } from './styles';

interface Request {
  data: {
    registers: Register[];
    url: string;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
  };
}

const ListRegisters: React.FC<Request> = ({
  data: { registers, url, setReload, reload },
}: Request) => {
  const handleDeleteRegister = useCallback(
    async (id: string): Promise<void> => {
      api
        .delete(`${url}/${id}`)
        .then(() => {
          setReload(!reload);
        })
        .catch(error => {
          if (error.response.data.message) {
            alert(error.response.data.message);
          }
        });
    },
    [url, reload, setReload],
  );
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
                console.log('edit', url, register.id);
              }}
            />
            <FiTrash2
              onClick={() => {
                handleDeleteRegister(register.id);
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
