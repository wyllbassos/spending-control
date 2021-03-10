import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../components/Button';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { Container } from './styles';

interface Register {
  id: string;
  title: string;
}

interface Registers {
  paymentModes: Register[];
  categories: Register[];
  subCategories: Register[];
}

const Dashboard: React.FC = () => {
  const [paymentModes, setPaymentModes] = useState<Register[]>([]);
  const [categories, setCategories] = useState<Register[]>([]);
  const [subCategories, setSubCategories] = useState<Register[]>([]);
  const [state, setState] = useState<{ step: number; params: object[] }>({
    step: 0,
    params: [],
  });

  useEffect(() => {
    api.get<Registers>('registers').then(({ data }) => {
      setPaymentModes(data.paymentModes);
      setCategories(data.categories);
      setSubCategories(data.subCategories);
    });
  }, []);

  const handleNextStep = useCallback((key, value) => {
    setState(current => ({
      step: current.step + 1,
      params: [...current.params, { [key]: value }],
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState(current => ({
      step: 0,
      params: [],
    }));
  }, []);

  console.log(state);

  return (
    <>
      <Header selected="/" />
      <Container>
        {state.step === 0 && (
          <div>
            <span>Tipo de Transação</span>
            <Button onClick={() => handleNextStep('type', 'income')}>
              Entrada
            </Button>
            <Button onClick={() => handleNextStep('type', 'outcome')}>
              Saída
            </Button>
          </div>
        )}

        {state.step === 1 && (
          <div>
            <span>Valor</span>
            <Input type="number" min={0} />
            <Button onClick={() => handleNextStep('value', 0)}>Avançar</Button>
          </div>
        )}

        {state.step === 2 && (
          <div>
            <span>Tipo de Pagamento</span>
            {paymentModes.map(paymentMode => (
              <Button
                key={paymentMode.id}
                onClick={() => handleNextStep('paymentMode', paymentMode.title)}
              >
                {paymentMode.title}
              </Button>
            ))}
          </div>
        )}

        {state.step === 3 && (
          <div>
            <span>Categoria</span>
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => handleNextStep('category', category.title)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        )}

        {state.step === 4 && (
          <div>
            <span>Sub Categoria</span>
            {subCategories.map(subCategory => (
              <Button
                key={subCategory.id}
                onClick={() => handleNextStep('subCategory', subCategory.title)}
              >
                {subCategory.title}
              </Button>
            ))}
          </div>
        )}

        {state.step === 5 && (
          <div>
            <span>Descrição</span>
            <Input type="text" />
            <Button onClick={() => handleNextStep('title', '')}>Avançar</Button>
          </div>
        )}

        {state.step !== 0 && (
          <Button onClick={() => handleReset()}>Voltar</Button>
        )}
      </Container>
    </>
  );

  /*
  return (
    <>
      <Header selected="/" />
      <Container>
        <Input type="date" label="Data Compra" />

        <Input type="date" label="Data Pagamento" />

        <Select
          label="Tipo"
          options={[
            { value: 'outcome', text: 'Saida' },
            { value: 'income', text: 'Entrada' },
          ]}
        />

        <Input type="number" label="Valor" />

        <Select
          label="Forma de Pagamento"
          options={[
            { value: 'outcome', text: 'Crédito' },
            { value: 'income', text: 'Débito' },
            { value: 'income', text: 'Dinheiro' },
          ]}
        />

        <Select
          label="Forma de Pagamento"
          options={paymentModes.map(paymentMode => ({
            value: paymentMode.title,
            text: paymentMode.title,
          }))}
        />

        <Select
          label="Categoria"
          options={categories.map(category => ({
            value: category.title,
            text: category.title,
          }))}
        />

        <Select
          label="Sub Categoria"
          options={subCategories.map(subCategory => ({
            value: subCategory.title,
            text: subCategory.title,
          }))}
        />

        <Input type="text" label="Descrição" />

        <Select
          label="Situação"
          options={[
            { value: 0, text: 'Pendente' },
            { value: 1, text: 'Pago' },
          ]}
        />

        <Button>Adicionar Gasto</Button>
      </Container>
    </>
  );
  */
};

export default Dashboard;
