import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 30px;
  border: 1px solid #ff9000;
  border-radius: 10px;

  & :first-child {
    border-radius: 10px 10px 0 0;
    background-color: #666360;
    font-weight: bold;
    grid-template-columns: 100%;
  }

  & :last-child {
    border-radius: 0 0 10px 10px;
  }

  span {
    align-self: center;
    justify-self: center;
  }

  li {
    padding: 10px;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 40px 40px calc(100% - 80px);
    color: #fff;
    background-color: #5636d3;
    border: 1px solid #ff9000;
    font-size: 20px;

    @media (max-width: 1000px) {
      font-size: 15px;
    }

    svg {
      background: transparent !important;
      align-self: center;
      justify-self: center;
      cursor: pointer;
    }

    svg:hover {
      color: ${shade(0.4, '#fff')};
    }
  }
`;
