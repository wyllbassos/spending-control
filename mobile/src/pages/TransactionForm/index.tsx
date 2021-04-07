import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {useRegisters, useThemes, useTransactions} from '../../hooks';
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
    payment_form_id: '',
    category_id: '',
    sub_category_id: '',
    type: 'income',
    date: new Date(),
  });

  const [value, setValue] = useState('');
  const [paymentForm, setPaymentForm] = useState<Register>({id: '', value: ''});
  const [category, setCategory] = useState<Register>({id: '', value: ''});
  const [subCategory, setSubCategory] = useState<Register>({id: '', value: ''});
  // const [description, setDescription] = useState('');
  const [error, setError] = useState<string>();

  const [income, setIncome] = useState<number>();
  const [transactionType, setTransactionType] = useState<
    'Entrada' | 'Saída' | 'Transferência'
  >();

  const {registers} = useRegisters();
  const {transactions, addTransaction, changeTransaction} = useTransactions();

  const paymentForms = useMemo(() => registers['payment-modes'], [registers]);
  const categories = useMemo(() => registers['categories'], [registers]);
  const subCategories = useMemo(() => registers['sub-categories'], [registers]);

  useEffect(() => {
    if (transactionId) {
      const selectedTransaction = transactions.find(
        (item) => item.id === transactionId,
      );
      if (selectedTransaction) {
        const paymentFormEdit = paymentForms.find(
          (item) => item.id === selectedTransaction.payment_form_id,
        );
        if (paymentFormEdit) setPaymentForm(paymentFormEdit);

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

    if (paymentForms.length) setPaymentForm(paymentForms[0]);
    if (categories.length) setCategory(categories[0]);
    if (subCategories.length) setSubCategory(subCategories[0]);

    setTransaction((current) => ({
      ...current,
      payment_form_id: (paymentForms[0] && paymentForms[0].id) || '',
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
    if (!transaction.payment_form_id) {
      errorText += 'Forma de Pagamento\n';
    }
    if (!transaction.category_id) {
      errorText += 'Categoria\n';
    }
    if (!transaction.sub_category_id) {
      errorText += 'Sub Categoria\n';
    }
    if (!transaction.date) {
      errorText += 'Data\n';
    }
    if (!transaction.paymentDate && paymentForm.type === 'CREDITO') {
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
    (picker, idPicker: number) => {
      if (picker === 'payment-form') {
        const paymantForm = paymentForms[idPicker];
        if (paymantForm) {
          setPaymentForm(paymantForm);
          setTransaction((current) => ({
            ...current,
            payment_form_id: paymantForm.id,
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
    [paymentForms, categories, subCategories],
  );

  const handleSetTransactionType = useCallback(
    (newTransactionType: 'Entrada' | 'Saída' | 'Transferência') => {
      setTransactionType(newTransactionType);
      setTransaction((current) => ({
        ...current,
        type: newTransactionType === 'Saída' ? 'outcome' : 'income',
      }));
    },
    [],
  );

  return (
    <Container backgroundColor={tercearyColor}>
      {transactionType === undefined && (
        <>
          <Button
            text="Saída"
            onPress={() => handleSetTransactionType('Saída')}
          />

          <Button
            text="Entrada"
            onPress={() => handleSetTransactionType('Entrada')}
          />

          <Button
            text="Transferência"
            onPress={() => handleSetTransactionType('Transferência')}
          />
        </>
      )}
      {transactionType !== undefined && (
        <Scroll>
          <PaymentTypeText color={primaryColor}>
            {!!transaction.value ? formatValue(transaction.value) : 'R$ 0,00'}
            {transactionType === 'Entrada' ? ' -> ' : ' <- '}
            {`${paymentForm.value} - ${paymentForm.type}`}
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
            label={'Forma de Pagamento:'}
            value={`${paymentForm.value} - ${paymentForm.type}`}
            error={!!error}
            onValueChange={(itemValue, index) =>
              handleChangePickers('payment-form', index)
            }
            pickerList={paymentForms.map((paymentFormMap) => ({
              ...paymentFormMap,
              value: `${paymentFormMap.value} - ${paymentFormMap.type}`,
            }))}
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
            datePickerValue={transaction.date}
            onChangeDate={(date) =>
              setTransaction((current) => ({...current, date}))
            }
          />

          {paymentForm.type === 'CREDITO' && (
            <Input
              type="datePicker"
              label={'Data do Pagamento:'}
              datePickerValue={transaction.paymentDate}
              onChangeDate={(paymentDate) =>
                setTransaction((current) => ({...current, paymentDate}))
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
      )}
    </Container>
  );
};

export default TransactionForm;
