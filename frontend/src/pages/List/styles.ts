import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px 20px 40px 20px;
  overflow-y: auto;

  @media (max-width: 1000px) {
    padding: 10px 10px;
  }
`;
