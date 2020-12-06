import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;
  @media (max-width: 1000px) {
    padding: 15px 0;
  }

  header {
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1000px) {
      padding: 0 10px;
      flex-direction: column;
    }

    nav {
      @media (max-width: 1000px) {
        margin-top: 20px;
      }
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        padding-bottom: 10px;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
      .headerNavLinkSelect {
        border-bottom: solid 2px #ff872c;
      }
    }
  }
`;
