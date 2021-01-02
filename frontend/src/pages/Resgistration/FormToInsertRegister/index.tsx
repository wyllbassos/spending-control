import React, { useCallback, useState } from 'react';
import { FiBook } from 'react-icons/fi';
import * as Yup from 'yup';
// import { useHistory } from 'react-router-dom';
import { Container, Title } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationsErrors from '../../../utils/getValidationsErrors';
import api from '../../../services/api';

interface FormToRegisterDataProps {
  data: {
    titleDescription: string;
    url: string;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
  };
}

const FormToInsertRegister: React.FC<FormToRegisterDataProps> = ({
  data: { titleDescription, url, setReload, reload },
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

        // const response = await api.post(`/${url}`, { title });
        await api.post(`/${url}`, { title });
        setTitle('');
        setReload(!reload);
        // history.push('/');
      } catch (errorYup) {
        if (errorYup instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(errorYup);
          setError(errors.title);
        }
      }
    },
    [title, url, reload, setReload],
  );

  return (
    <>
      <Title>{`Cadastrar - ${titleDescription}`}</Title>
      <Container onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={error}
          icon={FiBook}
          placeholder={`Descrição da ${titleDescription}`}
        />

        <Button type="submit">Cadastrar</Button>
      </Container>
    </>
  );
};

export default FormToInsertRegister;
