import React from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import formatValue from '../../utils/formatValue';

import { StyledCard } from './styles';

interface CardProps {
  title: string;
  type: 'income' | 'outcome' | 'total';
  value: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { title, type, value } = props;

  let src = '';
  if (type === 'income') src = income;
  else if (type === 'outcome') src = outcome;
  else src = total;

  return (
    <StyledCard total={type === 'total'}>
      <header>
        <p>{title}</p>
        <img src={src} alt={type} />
      </header>
      <h1 data-testid={`balance-${type}`}>{formatValue(Number(value))}</h1>
    </StyledCard>
  );
};

export default Card;
