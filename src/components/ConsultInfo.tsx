import styled from 'styled-components';
import { AppointmentItem } from './AppointmentItem';
import { SourcesList } from './SourcesList';
import checkIcon from '../assets/img/icon-consult-help.svg';
import { useEffect, useMemo, useState } from 'react';
import { AgreementNumber } from './AgreementNumber';
import { useLocation } from 'react-router-dom'

const types = [
  {
    title: 'Гастроэзофагеальная рефлюксная болезнь (ГЭРБ)',
    text: 'Выберите прием и нажмите кнопку “начать”, чтобы смоделировать клинический случай и получить экспертную консультацию по ведению вашего пациента',
    notices: [
      `*Депрескрайбинг - это процесс снижения дозировки, приостановки приема
      или полной отмены лекарственного препарата с целью снижения
      полипрагмазии и улучшения результатов лечения.`,
    ],
    type: 'herb',
    items: [
      {
        title: 'Первичный прием',
        list: [
          'Анализ жалоб',
          'План обследования',
          'Предварительный диагноз',
          'Эмпирическая терапия',
        ],
        route: '/first',
        ymTarget: 'cdss_1st',
      },
      {
        title: 'Повторный прием',
        list: [
          'Интерпретация результатов обследования',
          'Подтверждение диагноза',
          'Планирование терапии',
        ],
        route: '/secondary',
        ymTarget: 'cdss_2nd',
      },
      {
        title: 'Контрольный прием',
        list: [
          'Оценка эффективности терапии',
          'Депрескрайбинг*',
          'Преодоление рефрактерности',
        ],
        route: '/control',
        ymTarget: 'cdss_3rd',
      },
    ],
  },
  {
    title: 'Синдром раздраженного кишечника (СРК)',
    text: 'Выберите прием и нажмите кнопку “начать”, чтобы смоделировать клинический случай и получить экспертную консультацию по ведению вашего пациента',
    type: 'srk',
    items: [
      {
        title: 'Первичный прием',
        list: [
          'Анализ жалоб',
          'План обследования',
          'Предварительный диагноз',
          'Эмпирическая терапия',
        ],
        route: '/srk/first',
        ymTarget: 'srk_1st',
      },
      {
        title: 'Повторный прием',
        list: [
          'Интерпретация результатов обследования на любом этапе ведения',
          'Дифференциальная диагностика',
          'Тактика ведения при СРК и других состояниях',
          'Схемы терапии',
        ],
        route: '/srk/secondary',
        ymTarget: 'srk_2nd',
      },
      {
        title: 'Контрольный прием',
        list: [
          'Оценка эффективности терапии',
          'Рекомендации по коррекции терапии',
          'Памятки по питанию и модификации образа жизни',
        ],
        route: '/srk/control',
        ymTarget: 'srk_3rd',
      },
    ],
  },
  {
    title: 'Лекарственные поражения печени (ЛПП)',
    text: 'Выберите прием и нажмите кнопку «начать», чтобы смоделировать клинический случай и получить экспертную консультацию по ведению вашего пациента',
    type: 'lpp',
    items: [
      {
        title: 'Первичный прием',
        list: [
          'Оценка показателей на соответствие критериям ЛПП',
          'Оценка гепатотоксичности препаратов',
          'Определение типа поражения',
          'План обследования',
        ],
        route: '/lpp/first',
        ymTarget: 'lpp_1st',
      },
      {
        title: 'Повторный прием',
        list: [
          'Постановка диагноза ЛПП',
          'Оценка по RUCAM',
          'Тактика ведения при ЛПП',
          'Схемы терапии',
        ],
        route: '/lpp/secondary',
        ymTarget: 'lpp_2nd',
      },
      {
        title: 'Инструменты',
        routes: [
          {
            title: 'Оценка R-показателя',
            route: '/lpp/type',
            ymTarget: 'lpp_r',
          },
          {
            title: 'RUCAM',
            route: '/lpp/rucam',
            ymTarget: 'lpp_rucam',
          },
          {
            title: 'Оценка гепатотоксичности препарата',
            route: '/lpp/hepatoxicity',
            ymTarget: 'lpp_hepatoxicity',
          },
        ],
      },
    ],
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

  @media (max-width: 991px) {
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
  @media (max-width: 991px) {
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
    background: rgb(230, 247, 255) url(${checkIcon}) no-repeat center;
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

const Head = styled.div`
  padding: 0 100px;
  margin: auto;
  position: relative;

  @media (max-width: 991px) {
    padding: 0 60px;
  }
`;

const NavBtn = styled.button`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  svg {
    width: 50%;
    height: 50%;
  }

  @media (max-width: 991px) {
    width: 40px;
    height: 40px;
  }
`

const advantages = [
  'Подбор фармакотерапии',
  'Проверка межлекарственных взаимодействий',
  'Дифференциальная диагностика',
  'Интерпретация результатов диагностики',
];

const ConsultInfo = () => {
  const [index, setIndex] = useState(0);
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('/srk')) {
      const srkData = types.findIndex(el => el.type === 'srk')

      if (!srkData) return

      setIndex(srkData)
    }

    if (location.pathname.includes('/lpp')) {
      const lppData = types.findIndex(el => el.type === 'lpp')

      if (!lppData) return

      setIndex(lppData)
    }
  }, [location.pathname])

  const data = useMemo(() => {
    return types[index];
  }, [index]);

  return (
    <Wrap className="consult-info">
      <Container>
        <Content>
          <Head>
            <NavBtn style={{left: 0}}  onClick={() => setIndex(index === 0 ? types.length - 1 : index - 1)}>
              <svg
                width="18"
                height="31"
                viewBox="0 0 18 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1.50011C18.1046 2.60471 18.1046 4.3955 17 5.5001L7.00004 15.5001L17 25.5C18.1046 26.6046 18.1046 28.3954 17 29.5C15.8954 30.6046 14.1046 30.6046 13 29.5L1.00006 17.5001C-0.104536 16.3955 -0.104536 14.6047 1.00006 13.5001L13 1.50011C14.1046 0.395517 15.8954 0.395517 17 1.50011Z"
                  fill="white"
                />
              </svg>
            </NavBtn>

            <Title>{data.title}</Title>
            <Desc>{data.text}</Desc>

            <NavBtn style={{right: 0}} onClick={() => setIndex(index === types.length - 1 ? 0 : index + 1)}>
              <svg
                width="18"
                height="31"
                viewBox="0 0 18 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.999995 1.50011C-0.1046 2.60471 -0.1046 4.3955 0.999997 5.5001L11 15.5001L1 25.5C-0.10459 26.6046 -0.104589 28.3954 1.00001 29.5C2.1046 30.6046 3.8954 30.6046 4.99999 29.5L16.9999 17.5001C18.1045 16.3955 18.1045 14.6047 16.9999 13.5001L4.99998 1.50011C3.89538 0.395517 2.10459 0.395517 0.999995 1.50011Z"
                  fill="white"
                />
              </svg>
            </NavBtn>
          </Head>
          <List>
            {data.items.map((item) => (
              <AppointmentItem key={item.title} item={item} />
            ))}
          </List>
        </Content>

        <Advantages>
          <AdvantagesTitle>Чем поможет цифровой консультант</AdvantagesTitle>
          <AdvantagesList>
            {advantages.map((item) => (
              <AdvantageItem key={item}>{item}</AdvantageItem>
            ))}
          </AdvantagesList>
        </Advantages>

        <SourcesList type={data.type as 'herb' | 'srk' | 'lpp'} />

        {data.notices?.map((el) => (
          <Helper key={el}>{el}</Helper>
        ))}

        <AgreementNumber type={data.type as 'herb' | 'srk' | 'lpp'} />
      </Container>
    </Wrap>
  );
};

export { ConsultInfo };
