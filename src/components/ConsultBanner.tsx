import styled from 'styled-components';
import img from '../assets/img/consult-banner.jpg';

const Wrap = styled.section`
  position: relative;
  display: block;
  width: 100%;
  background-image: url(${img});
  background-size: cover;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1240px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 86px 0;
  display: block;
  width: 100%;
  max-width: 770px;

  @media (max-width: 992px) {
    max-width: 570px;
  }

  @media (max-width: 768px) {
    max-width: 440px;
    padding: 66px 0;
  }

  @media (max-width: 576px) {
    max-width: 340px;
    padding: 46px 0;
  }
`;

const Title = styled.div`
  display: block;
  width: 100%;
  margin: 0 0 12px;
  color: #fff;
  font-size: 43px;
  font-style: normal;
  font-weight: 700;
  line-height: 52px;
  text-transform: uppercase;

  @media (max-width: 992px) {
    font-size: 30px;
    line-height: 40px;
  }

  @media (max-width: 768px) {
    font-size: 26px;
    line-height: 36px;
  }

  @media (max-width: 576px) {
    font-size: 26px;
    line-height: 32px;
  }
`;

const Desc = styled.div`
  display: block;
  width: 100%;
  margin: 0;
  color: #fff;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px;

  @media (max-width: 992px) {
    font-size: 22px;
    line-height: 28px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 25px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const ConsultBanner = () => {
  return (
    <Wrap>
      <Container>
        <Content>
          <Title>Цифровой консультант врача</Title>
          <Desc>
            Индивидуальные решения по ведению пациента на основе клинических
            рекомендаций, стандартов и международных баз знаний
          </Desc>
        </Content>
      </Container>
    </Wrap>
  );
};

export { ConsultBanner };
