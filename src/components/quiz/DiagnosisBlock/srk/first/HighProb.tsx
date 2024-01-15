import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  Examination,
  RecommendationCardType,
} from '../../../../../types/interfaces';
import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  Heading,
  Item,
  List,
  Notice,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DosageList } from '../../../../DosageList';
import { DiagnosisCard } from '../../elements';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { Notification } from '../../../Notification';
import { ChecksList } from '../../../ChecksList';

import tube from '../../../../../assets/img/tube.png';
import kidney from '../../../../../assets/img/kidney.png';
import doctorIcon from '../../../../../assets/img/doctor.png';
import stomach from '../../../../../assets/img/stomach.png';
import egds from '../../../../../assets/img/egds.png';
import { selectSrkSelectedSymptoms } from '../../../../../store/srk/symptomsSlice';
import styled from 'styled-components';
import { setMedsToCheck } from '../../../../../store/utilsSlice';
import { selectRim4Questions } from '../../../../../store/srk/rim4Slice';

interface Props {
  onBack: () => void;
}

const SrkDiagnosisCard = styled(DiagnosisCard)`
  font-size: 24px;

  var {
    @media (max-width: 768px) {
      top: 0 !important;
      bottom: 0;
      margin: auto;
      height: fit-content;
      font-size: 36px !important;
    }
  }
`;

const HighProb = ({ onBack }: Props) => {
  const symptoms = useAppSelector(selectSrkSelectedSymptoms);
  const rim4Answers = useAppSelector(selectRim4Questions);

  const hasType = (type: string) => {
    return Boolean(symptoms.filter((el) => el.type === type).length);
  };

  const checkRim4Answer = (id: string, answer: string | number) => {
    const question = rim4Answers.find((el) => el.id === id);

    if (question?.value?.value === answer) {
      return true;
    }

    return false;
  };

  const isRim4BothYes = () => {
    return (
      checkRim4Answer('recid_stomach_ache', 1) &&
      checkRim4Answer('last_8_weeks', 1)
    );
  };

  const baseExaminations = () => {
    const list: RecommendationCardType[] = [];

    list.push({
      title: 'Лабораторные диагностические исследования:',
      icon: tube,
      list: (() => {
        let list = [
          'Общий (клинический) анализ крови',
          'Биохимический анализ крови',
          'Анализ кала на скрытую кровь',
        ];

        if (hasType('Диарея')) {
          list = list.concat([
            'Анализ крови на антитела к тканевой трансглютаминазе  - IgA и IgG',
            'Анализ кала на кишечные инфекции',
            'Экспресс-исследование кала на токсины А и В Cl. difficile',
            'Кальпротектин кала',
            'Водородный дыхательный тест с лактулозой или глюкозой (СИБР)',
          ]);
        }

        return list;
      })(),
    });

    list.push({
      title: 'Инструментальные диагностические исследования:',
      icon: kidney,
      list: [
        'УЗИ органов брюшной полости',
        'ЭГДС',
        'Илеоколоноскопия с биопсией из толстого и тонкого кишечника',
      ],
    });

    list.push({
      title: 'Дополнительные исследования:',
      icon: doctorIcon,
      expandable: true,
      list: (() => {
        let list = [
          'Анализ крови на ТТГ',
          'Консультация гинеколога при подозрении на связь болей с гинекологическими заболеваниями (эндометриоз, воспалительные заболевания, опухоль яичника)',
        ];

        if (hasType('Диарея')) {
          list = [
            'Анализ крови на ТТГ',
            'Дыхательный водородный тест для определения лактазной и дисахаридазной недостаточности (с лактозой или фруктозой)',
            'Анализ кала на панкреатическую эластазу-1',
            'Консультация гинеколога при подозрении на связь боли с гинекологическими заболеваниями (эндометриоз, воспалительные заболевания, опухоль яичника)',
          ];
        }

        return list;
      })(),
    });

    return list;
  };

  const usefulMaterials = () => {
    const list: RecommendationCardType[] = [];

    list.push({
      title: 'Памятки по подготовке к исследованиям:',
      icon: stomach,
      expandable: true,
      unlist: true,
      list: [
        'Колоноскопия <a href="/cdss/pdf/colono.pdf" target="_blank" rel="noopener">Скачать</a>',
        'УЗИ <a href="/cdss/pdf/uzi.pdf" target="_blank" rel="noopener">Скачать</a>',
        'Анализ кала <a href="/cdss/pdf/feces.pdf" target="_blank" rel="noopener">Скачать</a>',
      ],
    });

    list.push({
      title: 'Памятки по питанию и модификации образа жизни:',
      icon: egds,
      expandable: true,
      unlist: true,
      list: [
        'Дневник наблюдения <a href="/cdss/pdf/diary.pdf" target="_blank" rel="noopener">Скачать</a>',
        'Рекомендации по изменению образа жизни и пищевого поведения <a href="/cdss/pdf/lifestyle.pdf" target="_blank" rel="noopener">Скачать</a>',
      ],
    });

    return list;
  };

  const doctors = () => {
    const list: string[] = [];

    if (hasType('Ложные позывы к дефекации')) {
      list.push('Инфекционист');
    }

    if (hasType('Кровь в кале') || hasType('Ложные позывы к дефекации')) {
      list.push('Колопроктолог');
    }

    if (hasType('Диспареуния')) {
      list.push('Гинеколог');
    }

    if (hasType('Ощущение неполного опорожнения мочевого пузыря')) {
      list.push('Уролог');
    }

    if (hasType('Утомляемость')) {
      list.push('Терапевт/невролог');
    }

    if (hasType('Фибромиалгия')) {
      list.push('Невролог');
      list.push('Ревматолог');
    }

    if (hasType('Мигрень') || hasType('Фибромиалгия')) {
      list.push('Невролог');
    }

    return list;
  };

  const spasm = [
    {
      title: 'Мебеверин',
      dosage: '200 мг 2 раза в день',
    },
    {
      title: 'Гиосцина бутилбромид',
      dosage:
        'Внутрь: 10-20 мг 3-5 раз в день <br> Ректально: 10-20 мг 3-5 раз в день',
    },
    {
      title: 'Пинаверия бромид ',
      dosage: '50-100 мг 2-3 раза в день',
    },
  ];

  const antidiarhea = [
    {
      title: 'Смектит диоктаэдрический',
      dosage: '3 г до 3 раз в день',
    },
    {
      title: 'Лоперамид',
      dosage:
        'Начальная доза 4 мг, далее по 2 мг по потребности. Максимальная суточная дозировка - 12 мг',
    },
  ];

  const laxative = [
    {
      title: 'Лактулоза',
      dosage: '15-40 мл сиропа в сутки',
    },
    {
      title: 'Оболочка семян подорожника овального',
      dosage: '10 г в сутки',
    },
  ];

  const carminative = [
    {
      title: 'Симетикон',
      dosage: '80 мг 3-5 раз в день',
    },
    {
      title: 'Диметикон',
      dosage: '300 мг 2-3 раза в день',
    },
  ];

  const pyro = [
    {
      title: 'Итоприда гидрохлорид',
      dosage: '50 мг 3 раза в день',
    },
  ];

  const herbHelp: RecommendationCardType = {
    title:
      'С дифференциальной диагностикой и подходами к лечению ГЭРБ можно ознакомиться в соответствующем разделе сайта:',
    linkHasArrow: true,
    linkLabel: 'Ознакомиться по ссылке',
    link: '/cdss/secondary',
  };

  const dispatch = useAppDispatch();

  const allMeds = () => {
    const items: string[] = [];

    if (hasType('Боль в животе')) {
      spasm.forEach((el) => items.push(el.title));
    }

    if (hasType('Диарея')) {
      antidiarhea.forEach((el) => items.push(el.title));
    }

    if (hasType('Запор')) {
      laxative.forEach((el) => items.push(el.title));
    }

    if (hasType('Метеоризм / Вздутие живота')) {
      carminative.forEach((el) => items.push(el.title));
      pyro.forEach((el) => items.push(el.title));
    }

    return items;
  };

  dispatch(setMedsToCheck(allMeds()));

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <Heading style={{ marginBottom: 12 }}>Вероятный диагноз</Heading>

          {!isRim4BothYes() ? (
            <>
              <SrkDiagnosisCard>
                <span>
                  У пациента выявлены симптомы, которые могут свидетельствовать
                  о наличии другого органического заболевания кишечника
                </span>
              </SrkDiagnosisCard>

              <Text>
                Рекомендуется уделить повышенное внимание диагностическому
                поиску и приоритизировать проведение илеоколоноскопии.
              </Text>
            </>
          ) : (
            <>
              <SrkDiagnosisCard style={{ gap: 0, fontWeight: 400 }}>
                <span style={{ maxWidth: '60%' }}>СРК</span>
                <var>96,3%</var>
                <div style={{ maxWidth: '65%' }}>
                  Точность критериев Рим IV*
                </div>
                Код по МКБ-10: K58.8
              </SrkDiagnosisCard>

              <Heading>
                Для подтверждения диагноза необходимо дообследование:
              </Heading>
            </>
          )}

          <CardsList blueNotifications list={baseExaminations()} hasBorder />

          <CardsList blueNotifications title="Полезные материалы" list={usefulMaterials()} />

          {isRim4BothYes() && <Notice>*согласно исследованию Ромерус 2023 г.</Notice>}
        </Column>

        <Column className="quiz-block__column">
          <Heading className="quiz-block__title" style={{ marginBottom: 12 }}>
            Эмпирическая терапия
          </Heading>

          {hasType('Боль в животе') && (
            <DosageList title="Спазмолитики:" list={spasm} />
          )}
          {hasType('Диарея') && (
            <DosageList title="Противодиарейные средства:" list={antidiarhea} />
          )}
          {hasType('Запор') && (
            <DosageList title="Слабительные средства" list={laxative} />
          )}
          {hasType('Метеоризм / Вздутие живота') && (
            <>
              <DosageList title="Ветрогонные средства" list={carminative} />
              <DosageList
                title="При подозрении на связь симптома с заболеваниями верхних отделов ЖКТ рассмотреть прокинетики:"
                list={pyro}
              />
            </>
          )}

          {Boolean(doctors().length) && (
            <>
              <Text>
                <span>
                  На основании указанных симптомов рекомендуется направить
                  пациента для консультации к следующим специалистам:{' '}
                </span>
              </Text>

              <ChecksList list={doctors()} />
            </>
          )}

          {hasType('Изжога и/или Тошнота') && (
            <>
              <Notification blue content="<b>Нетипичные симптомы</b> Изжога и тошнота не являются типичными для СРК симптомами заболевания, но при этом не исключают его наличие." />

              <Text>
                Рекомендуется проведение диагностики верхних отделов ЖКТ на
                наличие сопутствующих заболеваний (например, ГЭРБ)
              </Text>

              <Text>
                В зависимости от степени проявления симптомов рассмотреть
                назначение следующих групп препаратов:
              </Text>

              <List>
                <Item>Ингибиторы протонной помпы</Item>
                <Item>Прокинетики</Item>
                <Item>Антациды</Item>
              </List>

              <CardsList blueNotifications list={[herbHelp]} />
            </>
          )}

          <InteractionsLinkBtn routePrefix="/srk" />

          <Foot $align="flex-end">
            <ButtonLink to="/" $type="light">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { HighProb };
