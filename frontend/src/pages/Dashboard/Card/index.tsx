/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import formatValue from '../../../utils/formatValue';

import { ITransaction } from '../';

import { Container, ItenContainer } from './styles';

interface ICardProps {
  transaction: ITransaction;
}

const Card: React.FC<ICardProps> = ({ transaction }: ICardProps) => {
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
    executed
  } = transaction;

  const formatedDate = new Date(date).toLocaleDateString();
  const formatedPaymentDate = new Date(payment_date).toLocaleDateString();
  const formatedValue =
    (type === 'outcome' ? '- ' : '') + formatValue(Number(value));

  return (
    <Container>
      <section>
        <ItenContainer>
          <label>
            Descrição:
            <span>{` ${title}`}</span>
          </label>
        </ItenContainer>
      </section>
      <section>
        <ItenContainer>
          <label>
            Data:
            <span>{` ${formatedDate}`}</span>
          </label>
          <label>
            Data Pag.:
            <span>{` ${formatedPaymentDate}`}</span>
          </label>
          <label>
            Situação:
            <span className={executed ? 'income' : 'outcome'}>{` ${executed ? 'Pago' : 'Pendente'}`}</span>
          </label>
        </ItenContainer>
        <ItenContainer>
          <label>
            Forma Pag.:
            <span>{` ${paymentMode.title}`}</span>
          </label>
          <label>
            Categoria:
            <span>{` ${category.title}`}</span>
          </label>
        </ItenContainer>
        <ItenContainer>
          <label>
            Valor:
            <span className={type}>{` ${formatedValue}`}</span>
          </label>
          <label>
            Sub Cat.:
            <span>{` ${subCategory.title}`}</span>
          </label>
          {installment_total > 0 ? (
            <ItenContainer>
              <label>
                Parcela:
                <span>{` ${installment_number} de ${installment_total}`}</span>
              </label>
            </ItenContainer>
          ) : <></>}
        </ItenContainer>
      </section>

    </Container>
  );
};

export default Card;
