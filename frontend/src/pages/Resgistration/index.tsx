import React from 'react';

import Header from '../../components/Header';

import ButtonsSelectRegister from './ButtonsSelectRegister';

import { Container } from './styles';
import FormToInsertRegister from './FormToInsertRegister';
import ListRecords from './ListRecords';
import RegistersProvider from './hooks';

export interface Register {
  title: string;
  id: string;
}

const Registration: React.FC = () => {
  return (
    <RegistersProvider>
      <Header selected="/registration" />
      <Container>
        <ButtonsSelectRegister />

        <FormToInsertRegister />

        <ListRecords />
      </Container>
    </RegistersProvider>
  );
};

export default Registration;
