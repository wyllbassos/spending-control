import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import ButtonsSelectRegister from './ButtonsSelectRegister';

import { Container } from './styles';
import FormToInsertRegister from './FormToInsertRegister';
import ListRegisters from './ListRegister';
import api from '../../services/api';

export interface Register {
  title: string;
  id: string;
}

const Registration: React.FC = () => {
  const [titleDescription, setTitleDescription] = useState('Sub Categoria');
  const [url, setUrl] = useState('sub-categories');
  const [reload, setReload] = useState(false);
  const [registers, setRegisters] = useState<Register[]>([]);

  useEffect(() => {
    api.get<Register[]>(url).then(response => {
      const { data } = response;
      setRegisters(data);
    });
  }, [url, reload]);

  return (
    <>
      <Header selected="/registration" />
      <Container>
        <ButtonsSelectRegister
          data={{ setTitleDescription, setUrl, titleDescription }}
        />

        <FormToInsertRegister
          data={{ titleDescription, url, setReload, reload }}
        />

        <ListRegisters data={{ registers, url, setReload, reload }} />
      </Container>
    </>
  );
};

export default Registration;
