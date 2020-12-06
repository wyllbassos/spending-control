import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, CardContainer, TableContainer } from './styles';
import Card from './Card';
import Table from './Table';

export interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<{
        transactions: Transaction[];
        balance: Balance;
      }>('/transactions');
      setBalance(response.data.balance);
      setTransactions(response.data.transactions);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header selected="/" />
      <Container>
        <CardContainer>
          <Card title="Entradas" type="income" value={balance.income} />
          <Card title="Saídas" type="outcome" value={balance.outcome} />
          <Card title="Total" type="total" value={balance.total} />
        </CardContainer>
        <Table transactions={transactions} />
      </Container>
    </>
  );
};

export default Dashboard;
