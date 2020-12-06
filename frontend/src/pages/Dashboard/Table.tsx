/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import formatValue from '../../utils/formatValue';

import { TableContainer } from './styles';

import { Transaction } from '.';

interface TableProps {
  transactions: Transaction[];
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { transactions } = props;

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => {
            const {
              title,
              type,
              value,
              created_at,
              category,
              id,
            } = transaction;
            const formatedCreateAt = new Date(created_at).toLocaleDateString();
            const formatedValue =
              (type === 'outcome' ? '- ' : '') + formatValue(Number(value));
            return (
              <tr key={id}>
                <td className="title">{title}</td>
                <td className={type}>{formatedValue}</td>
                <td>{category.title}</td>
                <td>{formatedCreateAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default Table;
