/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import formatValue from '../../../utils/formatValue';

import { Transaction } from '..';

import { Container, ItenContainer } from './styles';

interface CardProps {
  transaction: Transaction;
}

const Card: React.FC<CardProps> = ({ transaction }: CardProps) => {
  const {
    date,
    payment_date,
    value,
    paymentMode,
    subCategory,
    category,
    title,
    type,
    installment_number,
    installment_total,
    executed,
  } = transaction;

  const formatedDate = new Date(date).toLocaleDateString();
  const formatedPaymentDate = new Date(payment_date).toLocaleDateString();
  const formatedValue =
    (type === 'outcome' ? '- ' : '') + formatValue(Number(value));

  return (
    <Container>
      <section>
        <ItenContainer>
          <div>
            Descrição:
            <span>{` ${title}`}</span>
          </div>
        </ItenContainer>
      </section>
      <section>
        <ItenContainer>
          <div>
            Data:
            <span>{` ${formatedDate}`}</span>
          </div>
          <div>
            Data Pag.:
            <span>{` ${formatedPaymentDate}`}</span>
          </div>
          <div>
            Situação:
            <span className={executed ? 'income' : 'outcome'}>
              {executed ? 'Pago' : 'Pendente'}
            </span>
          </div>
        </ItenContainer>
        <ItenContainer>
          <div>
            Forma Pag.:
            <span>{` ${paymentMode.title}`}</span>
          </div>
          <div>
            Categoria:
            <span>{` ${category.title}`}</span>
          </div>
        </ItenContainer>
        <ItenContainer>
          <div>
            Valor:
            <span className={type}>{` ${formatedValue}`}</span>
          </div>
          <div>
            Sub Cat.:
            <span>{` ${subCategory.title}`}</span>
          </div>
          {installment_total > 0 ? (
            <ItenContainer>
              <div>
                Parcela:
                <span>{` ${installment_number} de ${installment_total}`}</span>
              </div>
            </ItenContainer>
          ) : (
            <></>
          )}
        </ItenContainer>
      </section>
    </Container>
  );
};

export default Card;
