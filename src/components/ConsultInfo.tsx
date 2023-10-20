import styled from 'styled-components';
import { AppointmentItem } from './AppointmentItem';
import { SourcesList } from './SourcesList';
import checkIcon from '../assets/img/icon-consult-help.svg'

const items = [
  {
    title: 'Первичный прием',
    list: [
      'Анализ жалоб',
      'План обследования',
      'Предварительный диагноз',
      'Эмпирическая терапия',
    ],
    route: '/first',
  },
  {
    title: 'Повторный прием',
    list: [
      'Интерпретация результатов обследования',
      'Подтверждение диагноза',
      'Планирование терапии',
    ],
    route: '/secondary',
  },
  {
    title: 'Контрольный прием',
    list: [
      'Оценка эффективности терапии',
      'Депрескрайбинг*',
      'Преодоление рефрактерности',
    ],
    route: '/control',
  },
];

const Wrap = styled.section`
  position: relative;
  display: block;
  width: 100%;
  padding: 40px 0;
  background: var(--background-blue, #e6f7ff);

  @media (max-width: 576px) {
    padding: 20px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1240px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
`;

const Content = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 20px;
  padding: 30px;
  border-radius: 16px;
  background: var(--primary-gastro, #00b140);

  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  display: block;
  width: 100%;
  margin: 0 0 15px;
  color: #fff;
  font-size: 47px;
  font-style: normal;
  font-weight: 700;
  line-height: 55px;

  @media (max-width: 1200px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media (max-width: 992px) {
    font-size: 30px;
    line-height: 38px;
  }
  @media (max-width: 576px) {
    font-size: 26px;
    line-height: 34px;
  }
  @media (max-width: 375px) {
    font-size: 22px;
    line-height: 28px;
  }
`;

const Desc = styled.div`
  display: block;
  width: 100%;
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;

  @media (max-width: 992px) {
    font-size: 20px;
    line-height: 28px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 24px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px -14px 0;
  border-top: 1px solid #fff;
  padding: 0;

  @media (max-width: 992px) {
    margin-top: 30px;
  }
  @media (max-width: 576px) {
    margin-top: 20px;
  }
`;

const Advantages = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 20px;
  padding: 30px 44px 36px;
  border-radius: 16px;
  border: 1px solid #00b140;
  background: #fff;

  @media (max-width: 768px) {
    padding: 26px 26px 32px;
  }
  @media (max-width: 576px) {
    padding: 26px 20px 32px;
  }
`;

const AdvantagesTitle = styled.div`
  position: relative;
  display: block;
  width: 100%;
  color: #00b140;
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
    line-height: 32px;
  }
  @media (max-width: 576px) {
    font-size: 22px;
    line-height: 28px;
  }
  @media (max-width: 375px) {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
  }
`;

const AdvantagesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px 0;
  padding: 0;
  list-style-type: none;
`;

const AdvantageItem = styled.li`
  display: flex;
  flex: 0 0 calc(25% - 24px);
  width: calc(25% - 24px);
  margin: 25px 12px 0;
  padding: 0;
  list-style-type: none;
  color: var(--main-font-color, #343a40);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;

  @media (max-width: 1200px) {
    flex: 0 0 calc(50% - 24px);
    width: calc(50% - 24px);
  }
  @media (max-width: 576px) {
    flex: 0 0 calc(100% - 24px);
    width: calc(100% - 24px);
  }

  @media (max-width: 375px) {
    font-size: 18px;
    margin-top: 15px;
  }

  &::before {
    content: '';
    flex: 0 0 26px;
    width: 26px;
    height: 26px;
    margin: 0 21px 0 0;
    background: rgb(230, 247, 255) url(${checkIcon})
      no-repeat center;
    background-size: auto;
    border-radius: 100%;

    @media (max-width: 375px) {
      margin-right: 15px;
    }
  }
`;

const Helper = styled.div`
  color: var(--text-secondary, #8c8c8c);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin-top: 20px;
`;

const advantages = [
  'Подбор фармакотерапии',
  'Проверка межлекарственных взаимодействий',
  'Дифференциальная диагностика',
  'Интерпретация результатов диагностики',
];

const ConsultInfo = () => {
  return (
    <Wrap className="consult-info">
      <Container>
        <Content>
          <Title>Гастроэзофагеальная рефлюксная болезнь (ГЭРБ)</Title>
          <Desc>
            Выберите прием и нажмите кнопку “начать”, чтобы смоделировать
            клинический случай и получить экспертную консультацию по ведению
            вашего пациента
          </Desc>
          <List>
            {items.map((item) => (
              <AppointmentItem key={item.title} item={item} />
            ))}
          </List>
        </Content>

        <Advantages>
          <AdvantagesTitle>Чем поможет цифровой консультант</AdvantagesTitle>
          <AdvantagesList>
            {advantages.map((item) => <AdvantageItem key={item}>{item}</AdvantageItem> )}
          </AdvantagesList>
        </Advantages>

        <SourcesList />

        <Helper>
          *Депрескрайбинг - это процесс снижения дозировки, приостановки приема
          или полной отмены лекарственного препарата с целью снижения
          полипрагмазии и улучшения результатов лечения.
        </Helper>
      </Container>
    </Wrap>
  );
};

export { ConsultInfo };
