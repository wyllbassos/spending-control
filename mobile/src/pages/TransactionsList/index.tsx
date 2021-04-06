import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {format} from 'date-fns';

import {useRegisters, useThemes, useTransactions} from '../../hooks';
import formatValue from '../../utils/formatValue';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';

import {Container} from '../../styles';

import {ListTansactionsContainer, Icon, ListBottonSpace} from './styles';
import {Register, RegisterKeys} from '../../hooks/registers';

const TransactionsList: React.FC = () => {
  const navigation = useNavigation();

  const {
    theme: {primaryColor, secundaryColor, tercearyColor},
  } = useThemes();

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

  const getRegisterRecord = useCallback(
    (registerKey: RegisterKeys, id): string => {
      const register = registers[registerKey].find((item) => item.id === id);
      if (register) {
        if (registerKey === 'payment-modes') {
          return `${register.value}${
            register.type ? ` - ${register.type}` : ''
          }`;
        }
        return register.value;
      }
      return '';
    },
    [paymentForms, categories, subCategories],
  );

  const textsForListItems = useMemo(() => {
    return transactions.map((transaction) => {
      const {
        category_id,
        payment_form_id,
        sub_category_id,
        value,
        description,
        date,
        paymentDate,
      } = transaction;
      const paymentMode = getRegisterRecord('payment-modes', payment_form_id);
      const category = getRegisterRecord('categories', category_id);
      const subCatgegory = getRegisterRecord('sub-categories', sub_category_id);
      return {
        unSelected: [description, formatValue(value)],
        selected: [
          description,
          formatValue(value),
          paymentMode,
          category,
          subCatgegory,
          (date && format(date, 'dd/MM/yyyy')) || '  /  /  ',
          (paymentDate && format(paymentDate, 'dd/MM/yyyy')) || '  /  /  ',
        ],
      };
    });
  }, [transactions]);

  return (
    <Container backgroundColor={tercearyColor}>
      <ListTansactionsContainer contentInset={{bottom: 100}}>
        {transactions.map((transaction, index) => {
          return (
            <ListItem
              key={transaction.id}
              text={
                selectedTransactionId !== transaction.id
                  ? textsForListItems[index].unSelected
                  : textsForListItems[index].selected
              }
              onPress={() =>
                setSelectedTransactionId(
                  selectedTransactionId !== transaction.id
                    ? transaction.id
                    : undefined,
                )
              }
              buttonTrash={{
                onPress: () => handleDeleteTransaction(transaction.id),
              }}
              buttonEdit={{
                onPress: () => handleSelectTransaction(transaction.id),
              }}
            />
          );
        })}
        <ListBottonSpace />
      </ListTansactionsContainer>

      <Button
        onPress={() => navigation.navigate('Transaction-form')}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icon name="plus" size={32} color={secundaryColor} />
      </Button>
    </Container>
  );
};

export default TransactionsList;
