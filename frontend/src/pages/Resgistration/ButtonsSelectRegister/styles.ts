import { shade } from 'polished';
import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  button {
    display: flex;
    justify-content: center;
    color: #fff;
    padding: 10px;
    background-color: #5636d3;
    font-size: 20px;
    font-weight: bold;
    border-radius: 0;
    border: 0;
    border: 1px solid #ff9000;

    @media (max-width: 1000px) {
      font-size: 15px;
    }

    &:hover {
      background: ${shade(0.2, '#5636d3')};
    }
  }

  & :first-child {
    border-radius: 10px 0 0 10px;

    @media (max-width: 1000px) {
      border-radius: 10px 10px 0 0;
    }
  }

  & :last-child {
    border-radius: 0 10px 10px 0;

    @media (max-width: 1000px) {
      border-radius: 0 0 10px 10px;
    }
  }

  .selected {
    background-color: #666360;
    &:hover {
      background: ${shade(0.2, '#666360')};
    }
  }
`;
