import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {useAccounts, useRegisters, useThemes, useTransactions} from '../../hooks';
import {Transaction} from 'src/hooks/transactions';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {Container} from '../../styles';

import {PaddingBotton, PaymentTypeText, Scroll} from './styles';
import {Register} from '../../hooks/registers';
import formatValue from '../../utils/formatValue';

interface RouteParams extends RouteProp<ParamListBase, string> {
  params: {
    transactionId?: string;
  };
}
const TransactionForm: React.FC = () => {
  const {params} = useRoute<RouteParams>();
  const transactionId = useMemo(() => params && params.transactionId, [params]);
  const navigation = useNavigation();

  const {
    theme: {primaryColor, tercearyColor},
  } = useThemes();

  const [transaction, setTransaction] = useState<Transaction>({
    id: '',
    description: '',
    value: 0,
    origin_account_id: '',
    destination_account_id: '',
    category_id: '',
    sub_category_id: '',
    transaction_date: new Date(),
  });

  const [value, setValue] = useState('');
  const [originAccount, setOriginAccount] = useState<Register>({id: '', value: ''});
  const [destinationAccount, setDestinationAccount] = useState<Register>({id: '', value: ''});
  const [category, setCategory] = useState<Register>({id: '', value: ''});
  const [subCategory, setSubCategory] = useState<Register>({id: '', value: ''});
  const [error, setError] = useState<string>();

  const {registers} = useRegisters();
  const {accounts} = useAccounts();
  const {transactions, addTransaction, changeTransaction} = useTransactions();

  const originAccounts = useMemo(() => accounts.filter(({type}) => type.search('SAIDA') >= 0), [accounts]);
  const destinationAccounts = useMemo(() => accounts.filter(({type}) => type.search('ENTRADA') >= 0), [accounts]);
  const categories = useMemo(() => registers['categories'], [registers]);
  const subCategories = useMemo(() => registers['sub-categories'], [registers]);

  useEffect(() => {
    if (transactionId) {
      const selectedTransaction = transactions.find(
        (item) => item.id === transactionId,
      );
      if (selectedTransaction) {
        const originAccountEdit = originAccounts.find(
          (item) => item.id === selectedTransaction.origin_account_id,
        );
        if (originAccountEdit) setOriginAccount(originAccountEdit);

        const destinationAccountEdit = destinationAccounts.find(
          (item) => item.id === selectedTransaction.destination_account_id,
        );
        if (destinationAccountEdit) setDestinationAccount(destinationAccountEdit);

        const categoryEdit = categories.find(
          (item) => item.id === selectedTransaction.category_id,
        );
        if (categoryEdit) setCategory(categoryEdit);

        const subCategoryEdit = subCategories.find(
          (item) => item.id === selectedTransaction.sub_category_id,
        );
        if (subCategoryEdit) setSubCategory(subCategoryEdit);

        setTransaction(selectedTransaction);
        setValue(String(selectedTransaction.value));
        // setCategory();
        return;
      }
    }

    if (originAccounts.length) setOriginAccount(originAccounts[0]);
    if (destinationAccounts.length) setDestinationAccount(destinationAccounts[0]);
    if (categories.length) setCategory(categories[0]);
    if (subCategories.length) setSubCategory(subCategories[0]);

    setTransaction((current) => ({
      ...current,
      origin_account_id: (originAccounts[0] && originAccounts[0].id) || '',
      destination_account_id: (destinationAccounts[0] && destinationAccounts[0].id) || '',
      category_id: (categories[0] && categories[0].id) || '',
      sub_category_id: (subCategories[0] && subCategories[0].id) || '',
    }));
  }, []);

  const handleAddRegister = useCallback(async () => {
    if (!handleCheckFields()) {
      return;
    }

    const ok = await addTransaction(transaction);

    if (ok) navigation.goBack();
    else Alert.alert('erro ao incluir');
  }, [transaction]);

  const handleChangeRegister = useCallback(async () => {
    if (!transaction) {
      Alert.alert('Não Selecionado Transação para Alterar');
      return;
    }

    const ok = await changeTransaction(transaction);

    if (ok) navigation.goBack();
    else Alert.alert('erro ao alterar');
  }, [transaction]);

  const handleCheckFields = useCallback(() => {
    let errorText = '';
    if (!transaction.description) {
      errorText += 'Descrição\n';
    }
    if (!transaction.value) {
      errorText += 'Valor\n';
    }
    if (!transaction.origin_account_id) {
      errorText += 'Forma de Pagamento\n';
    }
    if (!transaction.category_id) {
      errorText += 'Categoria\n';
    }
    if (!transaction.sub_category_id) {
      errorText += 'Sub Categoria\n';
    }
    if (!transaction.transaction_date) {
      errorText += 'Data\n';
    }
    if (!transaction.execution_date && originAccount.type === 'SAIDA') {
      errorText += 'Data de Pagamento\n';
    }

    if (errorText) {
      setError(errorText);
      Alert.alert('Preencha:', errorText);
      return false;
    }
    return true;
  }, [transaction]);

  useEffect(() => {
    if (!!error) setError(undefined);
  }, [transaction]);

  const handleChangeValue = useCallback((newValue: string) => {
    if (Number.isNaN(Number(newValue.replace(',', '.')))) {
      return;
    }
    setValue(newValue);
    setTransaction((current) => ({
      ...current,
      value: Number(newValue.replace(',', '.')),
    }));
  }, []);

  const handleChangePickers = useCallback(
    (picker: string, idPicker: number) => {
      if (picker === 'origin_account') {
        const newOriginAccount = originAccounts[idPicker];
        if (newOriginAccount) {
          setOriginAccount(newOriginAccount);
          setTransaction((current) => ({
            ...current,
            origin_account_id: newOriginAccount.id,
          }));
        }
        return;
      }

      if (picker === 'destination_account') {
        const newDestinationAccount = destinationAccounts[idPicker];
        if (newDestinationAccount) {
          setDestinationAccount(newDestinationAccount);
          setTransaction((current) => ({
            ...current,
            destination_account_id: newDestinationAccount.id,
          }));
        }
        return;
      }

      if (picker === 'category') {
        const category = categories[idPicker];
        if (category) {
          setCategory(category);
          setTransaction((current) => ({
            ...current,
            category_id: category.id,
          }));
        }
        return;
      }

      if (picker === 'sub-category') {
        const subCategory = subCategories[idPicker];
        if (subCategory) {
          setSubCategory(subCategory);
          setTransaction((current) => ({
            ...current,
            sub_category_id: subCategory.id,
          }));
        }
        return;
      }
    },
    [originAccounts, destinationAccounts, categories, subCategories],
  );

  const handleSetTransactionType = useCallback(() => {
      setTransaction((current) => ({
        ...current,
      }));
    },
    [],
  );

  return (
    <Container backgroundColor={tercearyColor}>
      <Scroll>
        <PaymentTypeText color={primaryColor}>
          {!!transaction.value ? formatValue(transaction.value) : 'R$ 0,00'}
          {/* {transactionType === 'Entrada' ? ' -> ' : ' <- '} */}
          {`${originAccount.value} - ${destinationAccount.type}`}
        </PaymentTypeText>

        <Input
          label={'Descrição:'}
          value={transaction.description}
          error={!!error}
          onChangeText={(description) => {
            setTransaction((current) => ({...current, description}));
          }}
        />

        <Input
          label={'Valor:'}
          value={value}
          error={!!error}
          onChangeText={handleChangeValue}
          keyboardType="numeric"
        />

        <Input
          type="picker"
          label={'Conta origem:'}
          value={originAccount.value}
          error={!!error}
          onValueChange={(itemValue, index) =>
            handleChangePickers('origin_account', index)
          }
          pickerList={originAccounts}
        />

        <Input
          type="picker"
          label={'Conta destino:'}
          value={destinationAccount.value}
          error={!!error}
          onValueChange={(itemValue, index) =>
            handleChangePickers('destination_account', index)
          }
          pickerList={destinationAccounts}
        />

        <Input
          type="picker"
          label={'Categoria:'}
          value={category.value}
          error={!!error}
          onValueChange={(itemValue, index) =>
            handleChangePickers('category', index)
          }
          pickerList={categories}
        />

        <Input
          type="picker"
          label={'Sub Categoria:'}
          value={subCategory.value}
          error={!!error}
          onValueChange={(itemValue, index) =>
            handleChangePickers('sub-category', index)
          }
          pickerList={subCategories}
        />

        <Input
          type="datePicker"
          label={'Data:'}
          datePickerValue={transaction.transaction_date}
          onChangeDate={(date) =>
            setTransaction((current) => ({...current, date}))
          }
        />

        {originAccount.type === 'SAIDA' && (
          <Input
            type="datePicker"
            label={'Data do Pagamento:'}
            datePickerValue={transaction.execution_date}
            onChangeDate={(execution_date) =>
              setTransaction((current) => ({...current, execution_date}))
            }
          />
        )}

        {!transactionId && (
          <Button text="Cadastrar" onPress={handleAddRegister} />
        )}

        {!!transactionId && (
          <Button text="Alterar" onPress={handleChangeRegister} />
        )}

        <PaddingBotton />
      </Scroll>
    </Container>
  );
};

export default TransactionForm;
