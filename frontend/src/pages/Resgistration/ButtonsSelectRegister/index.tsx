import React, { useCallback } from 'react';
// import { FiBook } from 'react-icons/fi';
// import { useHistory } from 'react-router-dom';
import { Container } from './styles';

interface RegisterSelect {
  data: {
    titleDescription: string;
    setTitleDescription: React.Dispatch<React.SetStateAction<string>>;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
  };
}

const ButtonsSelectRegister: React.FC<RegisterSelect> = ({
  data: { setTitleDescription, setUrl, titleDescription },
}: RegisterSelect) => {
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
