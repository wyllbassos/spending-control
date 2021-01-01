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

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;

    button {
      display: flex;
      justify-content: center;
      color: #fff;
      padding: 10px;
      background-color: #5636d3;
      font-size: 20px;
      font-weight: bold;
      border-radius: 0;
    }
  }

  ul {
    margin-top: 30px;
    li {
      display: flex;
      justify-content: center;
      background-color: #5636d3;
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;
      border-radius: 8px;
    }
  }

  @media (max-width: 1000px) {
    padding: 10px 10px;
  }
`;
