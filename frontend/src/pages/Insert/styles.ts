import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
  @media (max-width: 1000px) {
    line-height: 30px;
    font-size: 28px;
  }
`;
export const Form = styled.form`
  display: grid;
  margin-top: 20px;
  row-gap: 30px;

  div {
    color: #363f5f;
    display: grid;
    max-width: 100%;
    label {
      font-size: 25px;
    }

    input,
    select {
      color: #363f5f;
      font-size: 20px;
      padding: 10px;
      width: 100%;
    }
  }

  button {
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;
export const ListError = styled.ul``;
