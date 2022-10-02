import styled from 'styled-components/native';

export const Scroll = styled.ScrollView`
  padding-top: 16px;
  width: 100%;
`;

export const PaddingBotton = styled.View`
  width: 100%;
  height: 32px;
`;

export const PaymentTypeText = styled.Text<{color: string}>`
  align-self: center;
  font-size: 16px;
  margin: 16px 0;
  color: ${({color}) => color};
`;
