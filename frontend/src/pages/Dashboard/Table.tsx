/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { CardsContainer } from './styles';

import { ITransaction } from '.';
import Card from './Card';

interface ICardsProps {
  transactions: ITransaction[];
}

const Table: React.FC<ICardsProps> = ({ transactions }: ICardsProps) => (
  <CardsContainer>
    {transactions.map(transaction => (
      <Card key={transaction.id} transaction={transaction} />
    ))}
  </CardsContainer>
);

export default Table;
