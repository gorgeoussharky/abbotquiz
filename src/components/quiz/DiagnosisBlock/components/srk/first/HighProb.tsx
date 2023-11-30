import { useAppSelector } from '../../../../../../app/hooks';
import {
  Examination,
  RecommendationCardType,
} from '../../../../../../types/interfaces';
import { CardsList } from '../../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  Heading,
  Item,
  List,
  QuizWrap,
  Text,
} from '../../../../../elements';
import { DosageList } from '../../../../../DosageList';
import { DiagnosisCard } from '../../elements';
import { InteractionsLinkBtn } from '../../../../InteractionsLinkBtn';
import { Notification } from '../../../../Notification';
import { ChecksList } from '../../../../ChecksList';

import tube from '../../../../../../assets/img/tube.png';
import kidney from '../../../../../../assets/img/kidney.png';
import doctorIcon from '../../../../../../assets/img/doctor.png';
import stomach from '../../../../../../assets/img/stomach.png';
import egds from '../../../../../../assets/img/egds.png';
import { selectSrkSelectedSymptoms } from '../../../../../../store/srkSymptomsSlice';

interface Props {
  onBack: () => void;
}

const HighProb = ({ onBack }: Props) => {
  const symptoms = useAppSelector(selectSrkSelectedSymptoms);

  const hasType = (type: string) => {
    return Boolean(symptoms.filter((el) => el.type === type).length);
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
        'УЗИ ОБП',
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
      })()
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
        'ЭГДС <a href="/cdss/pdf/egds.pdf">Скачать</a>',
        'Манометрия высокого разрешения <a href="/cdss/pdf/manometry.pdf">Скачать</a>',
        'Рентгеноскопия <a href="/cdss/pdf/rentgen.pdf">Скачать</a>',
      ],
    });

    list.push({
      title: 'Памятки по питанию и модификации образа жизни:',
      icon: egds,
      expandable: true,
      unlist: true,
      list: [
        'Дневник наблюдения <a href="">Скачать</a>',
        'Рекомендации по изменению образа жизни и пищевого поведению <a href="/cdss/pdf/lifestyle.pdf">Скачать</a>',
      ],
    });

    return list;
  };

  const doctors = () => {
    const symptoms: string[] = [];

    if (hasType('Ложные позывы к дефекации')) {
      symptoms.push('Врач-инфекционист');
    }

    if (hasType('Кровь в кале') || hasType('Ложные позывы к дефекации')) {
      symptoms.push('Колопроктолог');
    }

    if (hasType('Диспареуния')) {
      symptoms.push('Гинеколог');
    }

    if (hasType('Ощущение неполного опорожнения мочевого пузыря')) {
      symptoms.push('Уролог');
    }

    if (hasType('Утомляемость')) {
      symptoms.push('Терапевт/невролог');
    }

    if (hasType('Фибромиалгия')) {
      symptoms.push('Невролог');
      symptoms.push('Ревматолог');
    }

    if (hasType('Мигрень') || hasType('Фибромиалгия')) {
      symptoms.push('Невролог');
    }

    return symptoms;
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
      dosage: '3 г (1 пакетик) до 3 раз в день',
    },
    {
      title: 'Лоперамид',
      dosage:
        'Начальная доза 4 мг, <br>  далее по 2 мг по потребности <br> Максимальная суточная дозировка - <br>  12 мг',
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

  const herbHelp:RecommendationCardType = {
    title: 'С дифференциальной диагностикой и подходами к лечению ГЭРБ можно ознакомиться в соответствующем разделе сайта:',
    linkHasArrow: true,
    linkLabel: 'Перейти',
    link: '/cdss/secondary'
  }

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <Heading style={{ marginBottom: 12 }}>Вероятный диагноз</Heading>

          <DiagnosisCard style={{ gap: 0, fontWeight: 400 }}>
            <span style={{ maxWidth: '60%' }}>СРК</span>
            <var>96,3%</var>
            Точность критериев Рим IV
          </DiagnosisCard>

          <Heading>
            Для подтверждения диагноза необходимо дообследование
          </Heading>

          <Text>
            В соответствии с наблюдаемыми у пациента симптомами и степенью их
            выраженности рекомендован следующий план обследований
          </Text>

          <CardsList list={baseExaminations()} hasBorder />

          <CardsList title="Полезные материалы" list={usefulMaterials()} />
        </Column>

        <Column className="quiz-block__column">
          <Heading className="quiz-block__title" style={{ marginBottom: 12 }}>Эмпирическая терапия</Heading>

          <Text>
            <span>
              Рекомендуется рассмотреть возможность назначения пациенту
              медикаментозной терапии, основываясь на указанных симптомах
            </span>
          </Text>

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
                  На основании указанных симптомов, рекомендуется направить
                  пациента для консультации к следующим специалистам:{' '}
                </span>
              </Text>

              <ChecksList list={doctors()} />
            </>
          )}

          {hasType('Изжога и/или Тошнота') && (
            <>
              <Notification content="<b>Нетипичные симптомы</b> Изжога и тошнота не являются типичными для СРК симптомами заболевания, но при этом не исключают его наличие." />

              <Text>
                Рекомендуется рассмотреть возможность проведения дополнительной
                диагностики верхних отделов ЖКТ на предмет наличия у пациента
                сопутствующих заболеваний (например, ГЭРБ).
              </Text>

              <Text>
                В зависимости от степени проявления симптомов можно рассмотреть
                назначение пациенту следующих групп лекарственных препаратов:
              </Text>

              <List>
                <Item>Ингибиторы протонной помпы</Item>
                <Item>Прокинетики</Item>
                <Item>Антациды</Item>
              </List>

              <CardsList list={[herbHelp]} />
            </>
          )}

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
};

export { HighProb };
