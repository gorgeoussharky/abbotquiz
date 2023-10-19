import { rentgenometry } from '../../../../../data/examinationsData';
import { schedule } from '../../../../../data/recommendations';
import { DosageList } from '../../../../DosageList/DosageList';
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
  Text,
} from '../../../../elements';
import { getAnswer } from '../../../../../app/helpers';
import { DiagnosisHeading, DiagnosisCard } from '../elements';

interface Props {
  onBack: () => void;
}

const EsophagitisA = ({ onBack }: Props) => {
  const hasNightSymptons = () => {
    return getAnswer('ЭГДС', 'Пациента беспокоят ночные симптомы');
  };

  const hasHernia = () => {
    return getAnswer(
      'ЭГДС',
      'Есть признаки грыжи пищеводного отверстия диафрагмы'
    );
  };

  const ipp = [
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
      dosage: '20 мг 1 раз в сутки',
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

  const pyro = [
    {
      title: 'Итоприда гидрохлорид',
      dosage: '50 мг 3 раза в сутки',
    },
  ];

  const eso = [
    {
      title: 'Сукральфат',
      dosage:
        '0,5–1 г 4 раза в сутки или по 1 г утром и вечером; максимальная суточная доза — 8 г',
    },
    {
      title: 'Альфазокс',
      dosage:
        'по одному пакетику-саше 3 раза в день после приема пищи и перед сном',
    },
  ];

  return (
    <div className="quiz-block">
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Диагноз</DiagnosisHeading>

          <DiagnosisCard>
            <div>ГЭРБ</div>
            <var>ЭЗОФАГИТ СТЕПЕНИ А</var>
            Код по МКБ 21.0
          </DiagnosisCard>

          {hasHernia() && (
            <>
              <DiagnosisHeading>Дополнительные обследования</DiagnosisHeading>

              <Text>
                Согласно выбранным симптомам и проведению первичного
                обследования рекомендованный список дополнительных обследований:
              </Text>

              <CardsList hasBorder list={[rentgenometry]} />
            </>
          )}

          <CardsList
            hasBorder
            title="Обратить внимание"
            notifications={[
              'Обсудите риск прогрессирования болезни и развитие таких осложнений, как пищевод Барретта, стриктуры и АКП. ',
              "Разъясните важность соблюдения схемы приема препаратов и модификации образа жизни. <a target='_blank' href='/pdf/lifestyle.pdf'>Памятка для пациента</a> ",
            ]}
          />

          <CardsList title="Дополнительно" list={[schedule]} />
        </Column>

        <Column>
          <Heading>Назначение на 4 недели:</Heading>

          <DosageList title="ИПП:" list={ipp} />

          <DosageList
            title="Прокинетик (по показаниям):"
            cols={1}
            list={pyro}
          />

          <DosageList title="Эзофагопротекторы" cols={1} list={eso} />

          {hasNightSymptons() ? (
            <Text>
              Учитывая наличие у пациента ночных эпизодов ГЭРБ, при выборе
              препарата из класса ИПП рекомендуется отдавать предпочтение
              оригинальному <span>рабепразолу</span>, т.к. у препарата есть:
            </Text>
          ) : (
            <Text>
              При выборе препарата из класса ИПП рекомендуется отдавать
              предпочтение оригинальному <span>рабепразолу</span>, т.к. у
              препарата есть:
            </Text>
          )}

          <List>
            <Item>Максимальный в классе ИПП потенциал кислотосупрессии</Item>
            <Item>
              Уникальный цитопротективный эффект за счет секреции слизи муцинов
            </Item>
            <Item>Минимальный риск межлекарственного взаимодействия</Item>
            <Item>Действие до 48 часов</Item>
          </List>

          <Text>
            Рекомендуется добавление <span>итоприда гидрохлорида</span> для
            устранения моторных нарушений. <span>Итоприда гидрохлорид</span>{' '}
            доказано нормализует тонус НПС, улучшает ПРНПС и антродуоденальную
            координацию, снижая количество эпизодов рефлюкса.
          </Text>

          <ButtonLink to="/" $large={true} style={{ marginBottom: `32px` }}>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 17C14.366 17 17.5 13.866 17.5 10C17.5 6.13401 14.366 3 10.5 3C6.63401 3 3.5 6.13401 3.5 10C3.5 13.866 6.63401 17 10.5 17Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.5 21L15.5 15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Проверить межлекарственные взаимодействия
          </ButtonLink>

          <Foot $align="flex-end">
            <ButtonLink to="/" $type="light">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </div>
  );
};

export { EsophagitisA };
