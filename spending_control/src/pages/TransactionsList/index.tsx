import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {format} from 'date-fns';

import {
  useAccounts,
  useRegisters,
  useThemes,
  useTransactions,
} from '../../hooks';
import formatValue from '../../utils/formatValue';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';

import {Container} from '../../styles';

import {
  ListTansactionsContainer,
  ListBottonSpace,
  TextItem,
  TextContainer,
  ValueContainer,
  IconValue,
} from './styles';
import {Register, RegisterKeys} from '../../hooks/registers';
import {RootStackParamList} from '../../types';
import Icon from 'react-native-vector-icons/Feather';

const TransactionsList: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    theme: {secundaryColor, tercearyColor},
  } = useThemes();

  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const {transactions, removeTransaction} = useTransactions();

  const {registers} = useRegisters();
  const {accounts} = useAccounts();

  const handleSelectTransaction = useCallback(
    (transactionId: string) => {
      navigation.navigate('Transaction-form', {transactionId});
    },
    [navigation],
  );

  const handleDeleteTransaction = useCallback(
    (id: string) => {
      const index = transactions.findIndex(register => register.id === id);

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
    [transactions, removeTransaction],
  );

  const getRegisterDescription = useCallback(
    (registerKey: RegisterKeys, id: string): Register | undefined => {
      let register: Register | undefined;

      if (registerKey == 'accounts') {
        register = accounts.find(item => item.id === id);
      } else {
        register = registers[registerKey].find(item => item.id === id);
      }

      return register;
    },
    [accounts, registers],
  );

  const textsForListItems = useMemo(() => {
    return transactions.map(transaction => {
      const {
        category_id,
        origin_account_id,
        destination_account_id,
        sub_category_id,
        value,
        transaction_date,
        execution_date,
      } = transaction;
      const originAccount = getRegisterDescription(
        'accounts',
        origin_account_id,
      );
      const destinationAccount = getRegisterDescription(
        'accounts',
        destination_account_id,
      );
      const category = getRegisterDescription('categories', category_id);
      const subCatgegory = getRegisterDescription(
        'sub-categories',
        sub_category_id,
      );

      const isOutcome = destinationAccount?.type === 'SAIDA';
      const isIncome = !isOutcome && originAccount?.type === 'ENTRADA';

      let selected = '';
      selected += `\n${originAccount?.value} -> ${destinationAccount?.value}`;
      selected += `\n\n${category ? category.value : ''} - ${
        subCatgegory ? subCatgegory.value : ''
      }`;

      if (transaction_date) {
        selected += '\n\nDATA DA TRANSAÇÃO';
        selected += `\n${format(transaction_date, 'dd/MM/yyyy')}`;
      }

      if (execution_date) {
        selected += '\n\nDATA DE PAGAMENTO';
        selected += `\n${format(execution_date, 'dd/MM/yyyy')}`;
      }

      return {
        arrowIcon: isOutcome ? 'arrow-down' : isIncome ? 'arrow-up' : 'repeat',
        credit: isOutcome,
        color: isOutcome ? '#e83f5b' : isIncome ? '#12a454' : 'gray',
        value: formatValue(value),

        selected,
      };
    });
  }, [transactions, getRegisterDescription]);

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
        onPress={() => navigation.navigate('Transaction-form', {})}
        circle="64px"
        style={{position: 'absolute', bottom: 8}}>
        <Icon name="plus" size={32} color={secundaryColor} />
      </Button>
    </Container>
  );
};

export default TransactionsList;
