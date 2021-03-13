/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../../components/Button';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';

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
  stepKey: string;
  value: any;
}

type Keys =
  | 'type'
  | 'value'
  | 'paymentMode'
  | 'category'
  | 'subCategory'
  | 'title'
  | 'date'
  | 'payment_date'
  | 'executed';

const keys: Keys[] = [
  'type',
  'value',
  'paymentMode',
  'category',
  'subCategory',
  'title',
  'date',
  'payment_date',
  'executed',
];

const initialParams = {
  type: '',
  value: '',
  paymentMode: '',
  category: '',
  subCategory: '',
  title: '',
  date: new Date().toISOString().split('T')[0],
  payment_date: new Date().toISOString().split('T')[0],
  executed: '',
};

const Dashboard: React.FC = () => {
  const [paymentModes, setPaymentModes] = useState<Register[]>([]);
  const [categories, setCategories] = useState<Register[]>([]);
  const [subCategories, setSubCategories] = useState<Register[]>([]);
  const [step, setStep] = useState(0);
  const [params, setParams] = useState(initialParams);

  const stepKey = useMemo(() => keys[step], [step]);
  const value = useMemo(() => params[keys[step]], [params, step]);

  useEffect(() => {
    api.get<Registers>('registers').then(({ data }) => {
      setPaymentModes(data.paymentModes);
      setCategories(data.categories);
      setSubCategories(data.subCategories);
    });
  }, []);

  const handleSaveTransaction = useCallback(() => {
    api.post('transactions', params).then(response => {
      console.log(response);
      alert('Transação Cadastrada');
      setStep(0);
      setParams(initialParams);
    });
  }, [params]);

  const handleSetParams = useCallback(
    (changeValue): boolean => {
      let newValue = changeValue;

      if (stepKey === 'value') {
        newValue = String(newValue).replace(',', '.');
        newValue = Number(newValue);
        if (Number.isNaN(newValue)) {
          alert('Deve ser um valor numérico');
          return false;
        }
        if (newValue < 0) {
          alert('O Valor Deve maior ou igual a zero');
          return false;
        }
      }

      if (stepKey === 'title') {
        if (newValue === '') {
          alert('A Descrição não pode ser nula');
          return false;
        }
      }

      if (stepKey === 'date' || stepKey === 'payment_date') {
        if (newValue === '') {
          alert('A data deve ser preenchida');
          return false;
        }
      }

      setParams(current => ({
        ...current,
        [stepKey]: newValue,
      }));
      return true;
    },
    [stepKey],
  );

  const handleNextStep = useCallback(
    changeValue => {
      if (!handleSetParams(changeValue)) return;

      setStep(current => current + 1);
    },
    [handleSetParams],
  );

  // console.log(params);

  return (
    <>
      <Header selected="/" />
      <Container>
        {step === 0 && (
          <div>
            <span>Tipo de Transação</span>
            <Button onClick={() => handleNextStep('income')}>Entrada</Button>
            <Button onClick={() => handleNextStep('outcome')}>Saída</Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <span>Valor</span>
            <Input
              value={value}
              onChange={e => handleSetParams(e.target.value)}
              type="number"
            />
            <Button onClick={() => handleNextStep(value)}>Avançar</Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <span>Tipo de Pagamento</span>
            {paymentModes.map(paymentMode => (
              <Button
                key={paymentMode.id}
                onClick={() => handleNextStep(paymentMode.title)}
              >
                {paymentMode.title}
              </Button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <span>Categoria</span>
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => handleNextStep(category.title)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <span>Sub Categoria</span>
            {subCategories.map(subCategory => (
              <Button
                key={subCategory.id}
                onClick={() => handleNextStep(subCategory.title)}
              >
                {subCategory.title}
              </Button>
            ))}
          </div>
        )}

        {step === 5 && (
          <div>
            <span>Descrição</span>
            <Input
              value={value}
              onChange={e => handleSetParams(e.target.value)}
              type="text"
            />
            <Button onClick={() => handleNextStep(value)}>Avançar</Button>
          </div>
        )}

        {step === 6 && (
          <div>
            <span>Data</span>
            <Input
              value={value}
              onChange={e => handleSetParams(e.target.value)}
              type="date"
            />
            <Button onClick={() => handleNextStep(value)}>Avançar</Button>
          </div>
        )}

        {step === 7 && (
          <div>
            <span>Data de Pagamento</span>
            <Input
              value={value}
              onChange={e => handleSetParams(e.target.value)}
              type="date"
            />
            <Button onClick={() => handleNextStep(value)}>Avançar</Button>
          </div>
        )}

        {step === 8 && (
          <div>
            <span>Gasto Pago.</span>
            <Button onClick={() => handleNextStep(0)}>Não</Button>
            <Button onClick={() => handleNextStep(1)}>Sim</Button>
          </div>
        )}

        {step === 9 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {keys.map(key => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{params[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              style={{ backgroundColor: 'green' }}
              onClick={handleSaveTransaction}
            >
              Cadastrar
            </Button>
          </>
        )}

        {step !== 0 && (
          <Button
            style={{ backgroundColor: 'red' }}
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Voltar
          </Button>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
