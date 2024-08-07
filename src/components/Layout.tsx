import { Outlet } from 'react-router-dom';
import { AgreementNumber } from './AgreementNumber';
import { Container } from './elements';
import { SourcesList } from './SourcesList';

interface Props {
  type: 'herb' | 'srk' | 'lpp';
}

const Layout = ({ type }: Props) => {
  return (
    <>
      <Outlet />
      <Container>
        <SourcesList type={type} />
        <AgreementNumber type={type} />
      </Container>
    </>
  );
};

export { Layout };
