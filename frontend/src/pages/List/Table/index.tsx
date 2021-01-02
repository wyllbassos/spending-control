/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { Container } from './styles';

import { Transaction } from '..';
import Card from './Card';

interface CardsProps {
  transactions: Transaction[];
}

const Table: React.FC<CardsProps> = ({ transactions }: CardsProps) => (
  <Container>
    {transactions.map(transaction => (
      <Card key={transaction.id} transaction={transaction} />
    ))}
  </Container>
);

export default Table;
