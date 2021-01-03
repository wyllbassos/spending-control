import React, { useCallback } from 'react';
import { useRegister } from '../hooks/register';
import { Container } from './styles';

const ButtonsSelectRegister: React.FC = () => {
  const { setTitleDescription, setUrl, titleDescription } = useRegister();
  const handleSetRegisterSelect = useCallback(
    (newTitle: string, url: string) => {
      setTitleDescription(newTitle);
      setUrl(url);
    },
    [setTitleDescription, setUrl],
  );

  return (
    <Container>
      <button
        className={titleDescription === 'Sub Categoria' ? 'selected' : ''}
        type="button"
        onClick={() => {
          handleSetRegisterSelect('Sub Categoria', 'sub-categories');
        }}
      >
        Sub Categoria
      </button>
      <button
        className={titleDescription === 'Categoria' ? 'selected' : ''}
        type="button"
        onClick={() => {
          handleSetRegisterSelect('Categoria', 'categories');
        }}
      >
        Categoria
      </button>
      <button
        className={titleDescription === 'Forma de Pagamento' ? 'selected' : ''}
        type="button"
        onClick={() => {
          handleSetRegisterSelect('Forma de Pagamento', 'payment-modes');
        }}
      >
        Forma de Pagamento
      </button>
    </Container>
  );
};

export default ButtonsSelectRegister;
