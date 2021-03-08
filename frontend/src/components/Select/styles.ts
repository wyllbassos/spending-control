import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  border-radius: 10px;
  padding: 8px 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}
  ${props =>
    props.isFilled &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}


  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  select {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    height: 40px;

    option {
      background-color: #5636d3;
      padding: 16px;
    }

    @media (max-width: 1000px) {
      font-size: 16px;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background-color: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
