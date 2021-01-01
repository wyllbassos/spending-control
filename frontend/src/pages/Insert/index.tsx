import React, { useCallback, useRef, useState } from 'react';
import { FiBook } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Container, Title } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErrors from '../../utils/getValidationsErrors';
import Header from '../../components/Header';
import api from '../../services/api';

interface FormToRegisterDataProps {
  titleDescription: string;
  url: string;
}

const FormToRegisterData: React.FC<FormToRegisterDataProps> = ({
  titleDescription,
  url,
}: FormToRegisterDataProps) => {
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setError('');
      try {
        const schema = Yup.object().shape({
          title: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate({ title }, { abortEarly: false });

        const response = await api.post(`/${url}`, { title });

        // history.push('/');
      } catch (errorYup) {
        if (errorYup instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(errorYup);
          setError(errors.title);
        }
      }
    },
    [title, url],
  );

  return (
    <>
      <Title>{`Cadastrar - ${titleDescription}`}</Title>
      <form onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={error}
          icon={FiBook}
          placeholder={`Descrição da ${titleDescription}`}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
    </>
  );
};

export default FormToRegisterData;
