import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {format} from 'date-fns';

import {useRegisters, useThemes, useTransactions} from '../../hooks';
import formatValue from '../../utils/formatValue';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';

import {Container} from '../../styles';

import {
  ListTansactionsContainer,
  Icon,
  ListBottonSpace,
  TextItem,
  TextContainer,
  ValueContainer,
  IconValue,
} from './styles';
import {Register, RegisterKeys} from '../../hooks/registers';

const TransactionsList: React.FC = () => {
  const navigation = useNavigation();

  const {
    theme: {primaryColor, secundaryColor, tercearyColor},
  } = useThemes();

  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const {transactions, removeTransaction} = useTransactions();

  const {registers} = useRegisters();

  const accounts = useMemo(() => registers['accounts'], [registers]);
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

  const getRegisterDescription = useCallback(
    (registerKey: RegisterKeys, id): Register | undefined => {
      const register = registers[registerKey].find((item) => item.id === id);
      if (register) {
        return register;
      }
      return undefined;
    },
    [accounts, categories, subCategories],
  );

  const textsForListItems = useMemo(() => {
    return transactions.map((transaction) => {
      const {
        category_id,
        origin_account_id,
        destination_account_id,
        sub_category_id,
        value,
        description,
        transaction_date,
        execution_date,
      } = transaction;
      const originAccount = getRegisterDescription('accounts', origin_account_id);
      const destinationAccount = getRegisterDescription('accounts', destination_account_id);
      const category = getRegisterDescription('categories', category_id);
      const subCatgegory = getRegisterDescription('sub-categories', sub_category_id);

      let unSelected = '';
      unSelected = description;
      // TODO criar campo para setar que a conta é minha
      unSelected += `\n${destinationAccount?.type !== 'ENTRADA/SAIDA' ? '-' : '+'} `;
      unSelected += formatValue(value);

      let selected = '';
      selected += `\n${originAccount?.value} -> ${destinationAccount?.value}`;
      selected += `\n\n${category ? category.value : ''} - ${subCatgegory ? subCatgegory.value : ''}`;

      if (transaction_date) {
        selected += `\n\nDATA DA TRANSAÇÃO`;
        selected += `\n${format(transaction_date, 'dd/MM/yyyy')}`;
      }

      if (execution_date) {
        selected += `\n\nDATA DE PAGAMENTO`;
        selected += `\n${format(execution_date, 'dd/MM/yyyy')}`;
      }

      return {
        arrowIcon: destinationAccount?.type !== 'ENTRADA/SAIDA' ? 'arrow-down-circle' : 'arrow-up-circle',
        credit: destinationAccount?.type !== 'ENTRADA/SAIDA',
        color: 'outcome' ? '#e83f5b' : '#12a454',
        value: formatValue(value),

        selected,
      };
    });
  }, [transactions]);

  return (
    <Container backgroundColor={tercearyColor}>
      <ListTansactionsContainer contentInset={{bottom: 100}}>
        {transactions.map((transaction, index) => {
          return (
            <ListItem
              // style={{
              //   backgroundColor:
              //     transaction.type === 'outcome' ? '#e83f5b' : '#12a454',
              // }}
              key={transaction.id}
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
              }}>
              <TextContainer>
                <ValueContainer>
                  <IconValue
                    name={textsForListItems[index].arrowIcon}
                    size={24}
                    color={textsForListItems[index].color}
                  />
                  <TextItem color={textsForListItems[index].color}>
                    {textsForListItems[index].value}
                  </TextItem>
                  {textsForListItems[index].credit && (
                    <IconValue
                      name="credit-card"
                      size={16}
                      color={textsForListItems[index].color}
                    />
                  )}
                </ValueContainer>

                <TextItem>{transaction.description}</TextItem>

                {selectedTransactionId === transaction.id && (
                  <TextItem>{textsForListItems[index].selected}</TextItem>
                )}
              </TextContainer>
            </ListItem>
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
