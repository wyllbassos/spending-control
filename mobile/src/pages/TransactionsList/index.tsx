import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {format} from 'date-fns';

import {useRegisters, useTransactions} from '../../hooks';
import formatValue from '../../utils/formatValue';

import Button from '../../components/Button';

// import formatValue from '../../utils/formatValue';

import {
  Container,
  ListTansactionsContainer,
  Transaction,
  TransactionData,
  TransactionExpand,
  TransactionText,
  Icon,
  ListBottonSpace,
} from './styles';

const TransactionsList: React.FC = () => {
  const navigation = useNavigation();

  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const {transactions, removeTransaction} = useTransactions();

  const {registers} = useRegisters();

  const paymentForms = useMemo(() => registers['payment-modes'], [registers]);
  const categories = useMemo(() => registers['categories'], [registers]);
  const subCategories = useMemo(() => registers['sub-categories'], [registers]);

  const handleSelectTransaction = useCallback(
    (transactionId: string) => {
      navigation.navigate('Transaction-form', {transactionId});
    },
    [navigation],
  );

  const handleDeleteTransaction = useCallback(
    (id) => {
      const index = transactions.findIndex((register) => register.id === id);

      Alert.alert(
        'Atenção',
        `Deseja deletar o registro ${transactions[index].description}`,
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await removeTransaction(id);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => '',
        },
      );
    },
    [transactions],
  );

  const handleGetRegisterRecord = useCallback(
    (register, id): string => {
      if (register === 'payment-mode') {
        const paymentMode = paymentForms.find((item) => item.id === id);
        if (paymentMode) {
          return paymentMode.value;
        }
        return '';
      }
      if (register === 'categories') {
        const category = categories.find((item) => item.id === id);
        if (category) {
          return category.value;
        }
        return '';
      }
      if (register === 'sub-categories') {
        const subCategory = subCategories.find((item) => item.id === id);
        if (subCategory) {
          return subCategory.value;
        }
        return '';
      }
      return '';
    },
    [paymentForms, categories, subCategories],
  );

  return (
    <Container>
      <ListTansactionsContainer contentInset={{bottom: 100}}>
        {transactions.map((transaction) => {
          if (selectedTransactionId !== transaction.id) {
            return (
              <Transaction
                key={transaction.id}
                style={{elevation: 2}}
                onPress={() => setSelectedTransactionId(transaction.id)}>
                <TransactionData>
                  <TransactionText>{transaction.description}</TransactionText>
                  <TransactionText>
                    {formatValue(transaction.value)}
                  </TransactionText>
                </TransactionData>

                <Icon
                  name="edit"
                  size={24}
                  color="#5636d3"
                  onPress={() => handleSelectTransaction(transaction.id)}
                />
                <Icon
                  name="trash-2"
                  size={24}
                  color="#5636d3"
                  onPress={() => handleDeleteTransaction(transaction.id)}
                />
              </Transaction>
            );
          }
          return (
            <TransactionExpand
              key={transaction.id}
              style={{elevation: 2}}
              onPress={() => setSelectedTransactionId(undefined)}>
              <TransactionData>
                <TransactionText>{transaction.description}</TransactionText>
                <TransactionText>
                  {formatValue(transaction.value)}
                </TransactionText>
                <TransactionText>
                  {handleGetRegisterRecord(
                    'payment-mode',
                    transaction.payment_form_id,
                  )}
                </TransactionText>
                <TransactionText>
                  {handleGetRegisterRecord(
                    'categories',
                    transaction.category_id,
                  )}
                </TransactionText>
                <TransactionText>
                  {handleGetRegisterRecord(
                    'sub-categories',
                    transaction.sub_category_id,
                  )}
                </TransactionText>
                <TransactionText>
                  {transaction.date && format(transaction.date, 'dd/MM/yyyy')}
                </TransactionText>
                <TransactionText>
                  {transaction.paymentDate &&
                    format(transaction.paymentDate, 'dd/MM/yyyy')}
                </TransactionText>
              </TransactionData>
              <Icon
                name="edit"
                size={24}
                color="#5636d3"
                onPress={() => handleSelectTransaction(transaction.id)}
              />
              <Icon
                name="trash-2"
                size={24}
                color="#5636d3"
                onPress={() => handleDeleteTransaction(transaction.id)}
              />
            </TransactionExpand>
          );
        })}
        <ListBottonSpace />
      </ListTansactionsContainer>

      <Button
        onPress={() => navigation.navigate('Transaction-form')}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icon name="plus" size={32} color="#FFF" />
      </Button>
    </Container>
  );
};

export default TransactionsList;
