import styled from 'styled-components';

interface CardProps {
  type?: 'income' | 'outcome';
  total?: boolean;
}

export const ItenContainer = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  label {
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

const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

const TableContainer = styled.section`
  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      @media (max-width: 1000px) {
        &:first-child {
          padding-left: 15px;
        }
        padding: 5px 0px;
        font-size: 10px;
      }
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      @media (max-width: 1000px) {
        &:first-child {
          padding-left: 15px;
        }
        padding: 5px 0px;
        font-size: 10px;
        line-height: 30px;
      }

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
