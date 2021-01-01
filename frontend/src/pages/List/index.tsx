import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

import Table from './Table';

interface Category {
  title: string;
}

interface SubCategory {
  title: string;
}

interface PaymentMode {
  title: string;
}

export interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_id: string;
  sub_category_id: string;
  payment_mode_id: string;
  date: string;
  payment_date: string;
  installment_number: number;
  installment_total: number;
  executed: boolean;
  category: Category;
  subCategory: SubCategory;
  paymentMode: PaymentMode;
  created_at: Date;
}

const List: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<Transaction[]>('/transactions');
      setTransactions(response.data);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header selected="/list" />
      <Container>
        <Table transactions={transactions} />
      </Container>
    </>
  );
};

export default List;
