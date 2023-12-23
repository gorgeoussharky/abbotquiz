import {
  egds,
  manometry,
  phImpedance,
} from '../../../../../store/herb/data/examinationsData';
import doctorIcon from '../../../../../assets/img/doctor.png';
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectSelectedSymptoms } from "../../../../../store/herb/symptomsSlice";
import { Examination } from "../../../../../types/interfaces";
import { CardsList } from "../../../CardsList";
import { BackLink, ButtonLink, Column, ColumnsWrap, Foot, Heading, Item, List, QuizWrap, Text } from "../../../../elements";
import { DosageList } from "../../../../DosageList";
import { schedule } from "../../../../../data/recommendations";
import { DiagnosisCard } from "../../elements";
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { setMedsToCheck } from '../../../../../store/utilsSlice';

interface Props {
  points: number
  onBack: () => void;
}

const HighProb = ({ onBack, points }: Props) => {
  const selectedSymptoms = useAppSelector(selectSelectedSymptoms);
  const dispatch = useAppDispatch()

  const probablity = () => {
    if (points > 3 && points < 8) {
      return 50;
    }
    if (points >= 8 && points <= 10) {
      return 79;
    }
    if (points >= 11) {
      return 89;
    }

    return 0;
  };

  const baseExaminations = () => {
    const exams: Examination[] = [];

    exams.push(egds);

    if (points > 3 && points < 8) {
      exams.push(manometry);
    }

    if (points >= 8) {
      exams.push(phImpedance);
    }

    return exams;
  };

  const optionalExaminations = () => {
    const exams: Examination[] = [];

    if (points > 3 && points < 8) {
      exams.push(phImpedance);
    }

    if (points >= 8) {
      exams.push(manometry);
    }

    return exams;
  };

  const additionalExaminations = () => {
    const exams: Examination[] = [];

    exams.push(schedule);

    const extraesophagealCount = selectedSymptoms.filter(
      (el) => el.type === 'Внепищеводные'
    );

    extraesophagealCount.forEach((symptom) => {
      exams.push({
        title: `Учитывая наличие у пациента <span>${symptom.group}</span>, с целью исключения сопутствующей патологии, рекомендуется направить пациента на консультацию к следующему специалисту: <span>${symptom.doctors}</span>`,
        icon: doctorIcon,
      });
    });

    return exams;
  };

  const notifications = () => {
    const notifications: string[] = [];
    if (points > 3 && points < 8) {
      notifications.push(
        'Учитывая наличие у пациента <b>дисфагии</b>, проведение манометрии высокого разрешения или рентгеноскопии пищевода и желудка с сульфатом бария является обязательным'
      );
    }

    if (points >= 8) {
      notifications.push(
        'Учитывая наличие у пациента внепищеводных проявлений ГЭРБ, проведение pH-импедансометрии является обязательным'
      );
    }

    notifications.push(
      'Необходимо провести лабораторные исследования: тест на инфекцию H.pylori (С13 уреазный дыхательный тест или определение антигена H.pylori в кале); анализ кала на скрытую кровь. Для исключения заболеваний сердца обязательным исследованием является проведение ЭКГ.'
    );
    return notifications;
  };

  const dosage = [
    {
      title: 'Рабепразол',
      dosage: '20мг 1 раз в сутки',
    },
    {
      title: 'Лансопразол',
      dosage: '60 мг 1 раз в сутки',
    },
    {
      title: 'Омепразол',
      dosage: '20 мг 1 раз в сутки',
    },
    {
      title: 'Пантопразол',
      dosage: '40 мг 1 раз в сутки',
    },
    {
      title: 'Эзомепразол',
      dosage: '40 мг 1 раз в сутки',
    },
    {
      title: 'Декслансопразол',
      dosage: '60 мг 1 раз в сутки',
    },
  ];

  dispatch(setMedsToCheck(dosage.map(el => el.title)))

  const secondaryNotifications = () => {
    const notificationsList: string[] = [];

    notificationsList.push(
      'При необходимости проведения теста на H. pylori следует воздержаться от назначения/приема ИПП (в том числе, комбинированнных препаратов) за 2 недели до теста'
    );

    if (points >= 8) {
      notificationsList.push(
        'При проведении pH-импедансометрии рекомендуется приостановить прием ИПП за 3-5 дней до проведения процедуры'
      );
    }

    return notificationsList;
  };

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column >
          <BackLink onClick={onBack}>
            Назад
          </BackLink>

          <Heading>Предварительный диагноз</Heading>

          <DiagnosisCard>
            <div style={{maxWidth: '60%'}}>Вероятность диагноза ГЭРБ</div>
            <var>{probablity()}%</var>
            Код по МКБ 21.0
          </DiagnosisCard>


          


          <Heading>
            Рекомендуемый план обследования
          </Heading>

          <Text >
            В соответствии с наблюдаемыми у пациента симптомами и степенью их
            выраженности рекомендован следующий план обследований
          </Text>


          <CardsList
            title="Базовые обследования"
            list={baseExaminations()}
            notifications={notifications()}
          />


          <CardsList
            title="Факультативные обследования"
            list={optionalExaminations()}
          />

          <CardsList
            title="Дополнительно"
            list={additionalExaminations()}
          />
        </Column>

        <Column className="quiz-block__column">
          <Heading className="quiz-block__title">Эмпирическая терапия</Heading>

          {points >= 8 && (
            <Text>
              Рекомендуется рассмотреть возможность назначения пациенту эмпирической
              терапии в зависимости от степени выраженности симптомов ГЭРБ.
            </Text>
          )}

          <Text>
            ИПП на выбор до получения результатов диагностических исследований с
            последующей коррекцией терапии, но на срок не более 4 недель:
          </Text>

          <DosageList list={dosage} />

          <Text>
            При выборе препарата из класса ИПП рекомендуется отдавать предпочтение{' '}
            рабепразолу, т.к. у препарата есть:
          </Text>

          <List>
            <Item>Максимальный в классе ИПП потенциал кислотосупрессии</Item>
            <Item>Купирование симптомов ГЭРБ быстрее других ИПП</Item>
            <Item>
              Уникальный цитопротективный эффект за счет секреции слизи муцинов
            </Item>
            <Item>Минимальный риск межлекарственного взаимодействия</Item>
          </List>

          <CardsList notifications={secondaryNotifications()} />

          <InteractionsLinkBtn />

          <Foot $align="flex-end">
            <ButtonLink to="/" $type="light">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
}

export { HighProb }