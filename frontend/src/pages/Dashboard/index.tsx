import React, { useCallback, useEffect, useRef, useState } from 'react';
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

interface KeyValue {
  key: string;
  value: any;
}

const Dashboard: React.FC = () => {
  const [paymentModes, setPaymentModes] = useState<Register[]>([]);
  const [categories, setCategories] = useState<Register[]>([]);
  const [subCategories, setSubCategories] = useState<Register[]>([]);
  const [state, setState] = useState<{ step: number; params: KeyValue[] }>({
    step: 0,
    params: [],
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    api.get<Registers>('registers').then(({ data }) => {
      setPaymentModes(data.paymentModes);
      setCategories(data.categories);
      setSubCategories(data.subCategories);
    });
  }, []);

  const handleNextStep = useCallback((key, value) => {
    let newValue = value;
    if (key === 'value') {
      newValue = String(newValue).replace(',', '.');
      console.log(newValue);
      newValue = Number(newValue);
      if (Number.isNaN(newValue)) {
        alert('Deve ser um valor numérico');
        return;
      }
      if (newValue < 0) {
        alert('O Valor Deve maior ou igual a zero');
        return;
      }
      setInputValue('');
    }

    if (key === 'title') {
      if (newValue === '') {
        alert('A Descrição não pode ser nula');
        return;
      }
      setInputValue(new Date().toISOString().split('T')[0]);
      // setInputValue('');
    }

    if (key === 'date' || key === 'payment_date') {
      console.log(newValue);
      if (newValue === '') {
        alert('A data deve ser preenchida');
        return;
      }
      // setInputValue(new Date().toISOString());
    }

    setState(current => ({
      step: current.step + 1,
      params: [...current.params, { key, value: newValue }],
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState(current => ({
      step: 0,
      params: [],
    }));
    setInputValue('');
  }, []);

  const handleSaveTransaction = useCallback(() => {
    console.log('ok');
  }, []);

  // console.log(state);
  console.log(inputValue);
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
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <Button onClick={() => handleNextStep('value', inputValue)}>
              Avançar
            </Button>
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
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              type="text"
            />
            <Button onClick={() => handleNextStep('title', inputValue)}>
              Avançar
            </Button>
          </div>
        )}

        {state.step === 6 && (
          <div>
            <span>Data</span>
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              type="date"
            />
            <Button onClick={() => handleNextStep('date', inputValue)}>
              Avançar
            </Button>
          </div>
        )}

        {state.step === 7 && (
          <div>
            <span>Data de Pagamento</span>
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              type="date"
            />
            <Button onClick={() => handleNextStep('payment_date', inputValue)}>
              Avançar
            </Button>
          </div>
        )}

        {state.step === 8 && (
          <div>
            {state.params.map(field => (
              <div key={field.key}>
                <span>{field.key}</span>
                <span>{field.value}</span>
              </div>
            ))}
            <Button onClick={handleSaveTransaction}>Cadastrar</Button>
          </div>
        )}

        {state.step !== 0 && (
          <Button
            style={{ backgroundColor: 'red' }}
            onClick={() => handleReset()}
          >
            Cancelar
          </Button>
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
