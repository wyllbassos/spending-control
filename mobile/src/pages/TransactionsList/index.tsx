import React, {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather';

import {useRegisters, useTransactions} from '../../hooks';

import Button from '../../components/Button';

// import formatValue from '../../utils/formatValue';

import {
  Container,
  ListTansactionsContainer,
  TransactionButton,
  TransactionText,
  ContainerIcon,
  ListBottonSpace,
} from './styles';

import {Alert} from 'react-native';

const TransactionsList: React.FC = () => {
  const navigation = useNavigation();

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

  const handleGetRegisterRecord = useCallback((register, id): string => {
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
  }, []);

  return (
    <Container>
      <ListTansactionsContainer contentInset={{bottom: 100}}>
        {transactions.map((transaction) => (
          <TransactionButton key={transaction.id} style={{elevation: 2}}>
            <TransactionText>{transaction.description}</TransactionText>
            <TransactionText>{transaction.value}</TransactionText>
            <TransactionText>
              {handleGetRegisterRecord(
                'payment-mode',
                transaction.payment_form_id,
              )}
            </TransactionText>
            <TransactionText>
              {handleGetRegisterRecord('categories', transaction.category_id)}
            </TransactionText>
            <TransactionText>
              {handleGetRegisterRecord(
                'sub-categories',
                transaction.sub_category_id,
              )}
            </TransactionText>
            <ContainerIcon
              onPress={() => handleSelectTransaction(transaction.id)}>
              <Icons name="edit" size={24} color="#5636d3" />
            </ContainerIcon>
            <ContainerIcon
              onPress={() => handleDeleteTransaction(transaction.id)}>
              <Icons name="trash-2" size={24} color="#5636d3" />
            </ContainerIcon>
          </TransactionButton>
        ))}
        <ListBottonSpace />
      </ListTansactionsContainer>

      <Button
        onPress={() => navigation.navigate('Transaction-form')}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icons name="plus" size={32} color="#FFF" />
      </Button>
    </Container>
  );
};

export default TransactionsList;
