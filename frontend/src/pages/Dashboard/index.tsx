import React from 'react';

// import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header selected="/" />
      <Container />
    </>
  );
};

export default Dashboard;
