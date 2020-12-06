import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

import Table from './Table';

interface ICategory {
  title: string;
}

interface ISubCategory {
  title: string;
}

interface IPaymentMode {
  title: string;
}

export interface ITransaction {
  id: string,
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_id: string;
  sub_category_id: string,
  payment_mode_id: string,
  date: string,
  payment_date: string,
  installment_number: number,
  installment_total: number,
  executed: boolean,
  category: ICategory;
  subCategory: ISubCategory,
  paymentMode: IPaymentMode,
  created_at: Date,
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<ITransaction[]>('/transactions');
      setTransactions(response.data);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header selected="/" />
      <Container>
        <Table transactions={transactions} />
      </Container>
    </>
  );
};

export default Dashboard;
