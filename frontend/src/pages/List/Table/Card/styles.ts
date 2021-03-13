import styled from 'styled-components';

interface CardProps {
  type?: 'income' | 'outcome';
  total?: boolean;
}

export const ItenContainer = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  div {
    color: #969cb3;
  }

  span {
    color: #fff;
    font-weight: bold;
    &.income {
      color: #12a454;
    }
    &.outcome {
      color: #e83f5b;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  background: #5636d3;
  color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  section {
    display: flex;
    width: 100%;

    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }
  &.title {
    color: #363f5f;
  }
`;
