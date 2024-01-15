import { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  type: 'srk' | 'herb';
}

export const Wrap = styled.div`
  font-size: 16px;
  line-height: 18px;
  color: #000;
  font-family: 'Georgia';
  text-align: right;
  margin-top: 97px;
  margin-bottom: 17px;
  width: 100%;

  @media (max-width: 630px) {
    margin-top: 40px;
    margin-right: 10px;
  }
`;

const AgreementNumber = ({ type }: Props) => {
  const number = useMemo(() => {
    switch (type) {
      case 'srk':
        return 'RUS2299313-2 (v2.0)';
      case 'herb':
        return 'RUS2283099-5 (v5.0)';
      default:
        return '';
    }
  }, [type]);

  return <Wrap>{number}</Wrap>;
};

export { AgreementNumber }