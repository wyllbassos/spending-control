import React, { useCallback, useState } from 'react';
import { FiBook } from 'react-icons/fi';
import * as Yup from 'yup';
import { Container, Title } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationsErrors from '../../../utils/getValidationsErrors';
import { useRegister } from '../hooks/register';

const FormToInsertRegister: React.FC = () => {
  const [error, setError] = useState('');

  const {
    titleDescription,
    title,
    setTitle,
    insertRegister,
    updating,
    updateRegister,
  } = useRegister();

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
        if (updating) {
          await updateRegister();
        } else {
          await insertRegister();
        }
        // history.push('/');
      } catch (errorYup) {
        if (errorYup instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(errorYup);
          setError(errors.title);
        }
      }
    },
    [title, insertRegister, updateRegister, updating],
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

        <Button type="submit">{updating ? 'Atualizar' : 'Cadastrar'}</Button>
      </Container>
    </>
  );
};

export default FormToInsertRegister;
