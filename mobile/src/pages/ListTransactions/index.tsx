import React from 'react';

// import formatValue from '../../utils/formatValue';

import {Container, Title, ButtonMenu, TextButtonMenu} from './styles';

const ListTransactions: React.FC = () => {
  return (
    <Container>
      <ButtonMenu>
        <TextButtonMenu>Lista</TextButtonMenu>
      </ButtonMenu>
    </Container>
  );
};

export default ListTransactions;
