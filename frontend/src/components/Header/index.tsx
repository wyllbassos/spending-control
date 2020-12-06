import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

// import './styles.css';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  selected: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  selected,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/" className={selected === '/' ? 'headerNavLinkSelect' : ''}>
          Listagem
        </Link>
        <Link
          to="/insert"
          className={selected === '/insert' ? 'headerNavLinkSelect' : ''}
        >
          Inserir
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
