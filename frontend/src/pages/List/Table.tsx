/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { CardsContainer } from './styles';

import { Transaction } from '.';
import Card from './Card';

interface CardsProps {
  transactions: Transaction[];
}

const Table: React.FC<CardsProps> = ({ transactions }: CardsProps) => (
  <CardsContainer>
    {transactions.map(transaction => (
      <Card key={transaction.id} transaction={transaction} />
    ))}
  </CardsContainer>
);

export default Table;
