import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import ListRegisters from './ListRegisters';

import Header from '../../components/Header';

import { Container } from './styles';
import FormToRegisterData from '../Insert';

interface RegisterSelect {
  titleDescription: string;
  url: string;
}

const Registration: React.FC = () => {
  const [titleDescription, setTitleDescription] = useState('Sub Categoria');
  const [url, setUrl] = useState('sub-categories');
  const handleSetRegisterSelect = useCallback((data: RegisterSelect) => {
    setTitleDescription(data.titleDescription);
    setUrl(data.url);
  }, []);
  return (
    <>
      <Header selected="/registration" />
      <Container>
        <div>
          <button
            type="button"
            onClick={() => {
              handleSetRegisterSelect({
                titleDescription: 'Sub Categoria',
                url: 'sub-categories',
              });
            }}
          >
            Sub Categoria
          </button>
          <button
            type="button"
            onClick={() => {
              handleSetRegisterSelect({
                titleDescription: 'Categoria',
                url: 'categories',
              });
            }}
          >
            Categoria
          </button>
          <button
            type="button"
            onClick={() => {
              handleSetRegisterSelect({
                titleDescription: 'Forma de Pagamento',
                url: 'payment-modes',
              });
            }}
          >
            Forma de Pagamento
          </button>
        </div>
        {titleDescription && url && (
          <FormToRegisterData titleDescription={titleDescription} url={url} />
        )}
        <ListRegisters url={url} />
      </Container>
    </>
  );
};

export default Registration;
