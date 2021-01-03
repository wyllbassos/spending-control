import React, { useCallback, useState } from 'react';
import { FiBook } from 'react-icons/fi';
import * as Yup from 'yup';
import { Container } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationsErrors from '../../../utils/getValidationsErrors';
import { useRegister } from '../hooks/register';

const FormToInsertRegister: React.FC = () => {
  const [error, setError] = useState('');

  const {
    title,
    setTitle,
    insertRegister,
    updating,
    deleting,
    updateRegister,
    deleteRegister,
    resetValues,
    registers,
    indexRegister,
  } = useRegister();

  const registerDescription = registers[indexRegister].description;

  const buttonDescription = useCallback(() => {
    if (updating) {
      return `Atualizar - ${registerDescription}`;
    }
    if (deleting) {
      return `Deletar - ${registerDescription}`;
    }
    return `Cadastrar - ${registerDescription}`;
  }, [updating, deleting, registerDescription]);

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
        } else if (deleting) {
          await deleteRegister();
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
    [title, insertRegister, updateRegister, updating, deleteRegister, deleting],
  );

  return (
    <>
      <Container onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={error}
          icon={FiBook}
          placeholder={`Descrição da ${registerDescription}`}
        />

        <Button type="submit">{buttonDescription()}</Button>
        {(updating || deleting) && (
          <Button
            type="button"
            style={{ backgroundColor: 'red' }}
            onClick={() => resetValues()}
          >
            Cancelar
          </Button>
        )}
      </Container>
    </>
  );
};

export default FormToInsertRegister;
