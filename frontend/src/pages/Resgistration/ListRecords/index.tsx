import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useRegister } from '../hooks/register';

import { Container } from './styles';

const ListRecords: React.FC = () => {
  const { records, setUpdating, setTitle, setId, setDeleting } = useRegister();

  return (
    <Container>
      <li>
        <span>Registros</span>
      </li>
      {records.map(record => {
        return (
          <li key={record.id}>
            <FiEdit
              onClick={() => {
                setDeleting(false);
                setUpdating(true);
                setTitle(record.title);
                setId(record.id);
              }}
            />
            <FiTrash2
              onClick={() => {
                setDeleting(true);
                setUpdating(false);
                setTitle(record.title);
                setId(record.id);
              }}
            />
            <span>{record.title}</span>
          </li>
        );
      })}
    </Container>
  );
};

export default ListRecords;
