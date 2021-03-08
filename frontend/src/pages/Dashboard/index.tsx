import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    api.get<Registers>('registers').then(({ data }) => {
      setPaymentModes(data.paymentModes);
      setCategories(data.categories);
      setSubCategories(data.subCategories);
    });
  }, []);

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
};

export default Dashboard;
