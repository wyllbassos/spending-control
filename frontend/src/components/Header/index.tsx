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
          Inicio
        </Link>
        <Link
          to="/list"
          className={selected === '/list' ? 'headerNavLinkSelect' : ''}
        >
          Listagem
        </Link>
        <Link
          to="/registration"
          className={selected === '/registration' ? 'headerNavLinkSelect' : ''}
        >
          Cadastros
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
