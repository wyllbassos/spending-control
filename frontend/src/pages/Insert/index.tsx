/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
import React, { FormEvent, useState } from 'react';

import Header from '../../components/Header';

import { Container, Title, Form, ListError } from './styles';

import api from '../../services/api';

interface Transaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: {
    title: string;
  };
}

const Import: React.FC = () => {
  const [type, setType] = useState<string>('-');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [inputError, setInputError] = useState<string[]>([]);

  async function submitTransaction(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const errors = [];
    if (!(type === 'income' || type === 'outcome')) {
      errors.push('O tipo está incorreto');
    }
    if (!title) {
      errors.push('O título deve ser preenchido');
    }
    if (!value) {
      errors.push('O Valor deve ser maior que 0');
    }
    if (!category) {
      errors.push('A Categoria deve ser preenchida');
    }
    if (errors.length === 0) {
      setInputError([]);
      const response = await api.post<Transaction>('/transactions', {
        type,
        value,
        title,
        category,
      });
      setInputError([JSON.stringify(response.data)]);
      setType('income');
      setTitle('');
      setValue(0);
      setCategory('');
    } else {
      setInputError(errors);
    }
  }

  return (
    <>
      <Header size="small" selected="/insert" />
      <Container>
        <Title>Inserir Movimentação</Title>
        <Form onSubmit={submitTransaction}>
          <div>
            <label htmlFor="type">Tipo</label>
            <select
              name="type"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="-">-</option>
              <option value="income">Entrada</option>
              <option value="outcome">Saída</option>
            </select>
          </div>
          <div>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="value">Valor</label>
            <input
              type="number"
              min={0}
              name="value"
              value={value}
              onChange={e => setValue(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="category">Categoria</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>
          {inputError.length > 0 && (
            <ListError>
              {inputError.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ListError>
          )}
          <button type="submit">Salvar</button>
        </Form>
      </Container>
    </>
  );
};

export default Import;
