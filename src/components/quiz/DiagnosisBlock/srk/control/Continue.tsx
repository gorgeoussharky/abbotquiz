import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  Item,
  List,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { DosageList } from '../../../../DosageList';
import { RecommendationCardType } from '../../../../../types/interfaces';

import egds from '../../../../../assets/img/egds.png';
import schedule from '../../../../../assets/img/schedule.png';
import { setMedsToCheck } from '../../../../../store/utilsSlice';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { useAppDispatch } from '../../../../../app/hooks';

interface Props {
  onBack: () => void;
}

const Continue = ({ onBack }: Props) => {
  const dispatch = useAppDispatch();

  const recommendations = [
    {
      title: 'Повторный прием через 3 месяца',
      icon: schedule,
    },
    {
      title:
        'При долгосрочном наблюдении пациента с СРК возможна смена фенотипа функциональных заболеваний ЖКТ, поэтому важно наблюдать <br/> за симптомами и корректировать терапию согласно текущим проявлениям.',
      icon: schedule,
    },
  ] as RecommendationCardType[];

  const usefulMaterials = [
    {
      title: 'Памятки по питанию и модификации образа жизни:',
      icon: egds,
      expandable: true,
      unlist: true,
      list: [
        'Дневник наблюдения <a href="">Скачать</a>',
        'Рекомендации по изменению образа жизни и пищевого поведения <a href="/cdss/pdf/lifestyle.pdf">Скачать</a>',
      ],
    },
  ];

  const allDosage = [
    {
      title: 'Спазмолитики',
      level: 'A1',
      items: [
        {
          title: 'Мебеверин',
          dosage: '200 мг 2 раза в день',
        },
        {
          title: 'Гиосцина бутилбромид',
          dosage: `Внутрь: 10-20 мг 3-5 раз в день <br> Ректально: 10-20 мг 3-5 раз в день <br />
          Ректально: 10-20 мг 3-5 раз в день`,
        },
        {
          title: 'Пинаверия бромид',
          dosage: '50-100 мг 2-3 раза в день',
        },
      ],
    },
    {
      title: 'Другие препараты:',
      items: [
        {
          title: 'Тримебутин',
          level: 'В2',
          dosage: '100-200 мг 3 раза в сутки',
        },
        {
          title: 'STW 5',
          level: 'C5',
          dosage: '20 капель 3 раза в день',
        },
      ],
    },
    {
      title: 'Слабительные средства:',
      items: [
        {
          title: 'Лактулоза',
          dosage: '15-40 мл сиропа в сутки',
          level: 'С5',
        },
        {
          title: 'Полиэтиленгликоль',
          level: 'С5',
          dosage: '10-20 г в сутки',
        },
        {
          title: 'Лактитол',
          level: 'С5',
          dosage: '10-20 г в сутки',
        },
        {
          title: 'Оболочка семян подорожника овального',
          dosage: '10 г в сутки',
          level: 'A2',
        },
        {
          title: 'Бисакодил',
          level: 'A2',
          dosage: '5-15 мг 1 раз в сутки',
        },
      ],
    },
    {
      title: 'Противодиарейные средства:',
      items: [
        {
          title: 'Лоперамид',
          level: 'B3',
          dosage:
            'Начальная доза 4 мг, далее по 2 мг по потребности. Максимальная суточная дозировка - 12 мг',
        },
        {
          title: 'Смектит диоктаэдрический',
          dosage: '3 г до 3 раз в день',
          level: 'B2',
        },
        {
          title: 'Рифаксимин',
          dosage: '200-400 мг каждые 8-12 часов',
          level: 'A1',
        },
      ],
    },
  ];

  const allMeds = () => {
    const items: string[] = [];

    allDosage.forEach((el) => {
      el.items.forEach((el) => items.push(el.title));
    });

    return items;
  };

  dispatch(setMedsToCheck(allMeds()));

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

          <DiagnosisCard style={{ color: 'var(--accent)' }}>
            Учитывая субъективное улучшение состояния и сохранение некоторых симптомов СРК рекомендуется продолжить лечение
          </DiagnosisCard>

          <DiagnosisHeading>Рекомендации</DiagnosisHeading>

          <CardsList
            hasBorder
            list={recommendations}
            blueNotifications
            notifications={[
              'Для устойчивой ремиссии пациенту необходимо пожизненно придерживаться советов по модификации образа жизни',
            ]}
          />

          <CardsList blueNotifications list={usefulMaterials} title="Полезные материалы" />
        </Column>

        <Column>
          <DiagnosisHeading>Медикаментозная терапия</DiagnosisHeading>

          {allDosage.map((el) => (
            <DosageList
              key={el.title}
              level={el.level}
              title={el.title}
              list={el.items}
            />
          ))}

          <div style={{ fontSize: 20, fontWeight: 700 }}>
            Пробиотики, содержащие различные штаммы лакто- и бифидобактерий:
          </div>
          <div style={{ color: 'var(--accent)', marginBottom: 12 }}>
            Уровень рекомендаций А2
          </div>
          <List>
            <Item>
              Должны содержать не менее миллиарда (10^9) бактериальных клеток в
              капсуле
            </Item>
            <Item>
              В виде капсул, покрытых кишечнорастворимой оболочкой, или в виде
              микрокапсулированных пробиотических препаратов
            </Item>
          </List>

          <Text>
          В рамках терапии абдоминального болевого синдрома важно подобрать
            препарат, который будет эффективно купировать боль и нормализовывать
            моторику кишечника. Обоснованным выбором можно считать оригинальный
            мебеверин. В рамках терапии абдоминального болевого синдрома важно
            подобрать препарат, который будет эффективно купировать боль и
            нормализовывать моторику кишечника. Обоснованным выбором можно
            считать оригинальный{' '}
            <a href="https://abbottpro.ru/academy/preparation/dyuspatalin" rel='noreferrer noopener' target="_blank">
              мебеверин
            </a>
            . Препарат устраняет широкий спектр симптомов (боль, вздутие,
            нарушения стула), за счет координации работы гладкомышечных клеток и
            восстановления моторики кишечника. <br />
            Учитывая его метаболизм без участия цитохромов печени, мебеверин
            может беспрепятственно назначаться с большинством препаратов.
            Длительность приема не ограничена, что свидетельствует о высоком
            профиле безопасности.
          </Text>

          <CardsList
            blueNotifications
            notifications={[
              'Если не наблюдается полноценного ответа на терапию, обратите внимание на СИБР, проверьте приверженность пациента к терапии и рассмотрите возможность консультации врача-психиатра, который успешно занимается лечением функциональных расстройств ЖКТ',
            ]}
          />

          <InteractionsLinkBtn />

          <Foot $align="flex-end">
            <ButtonLink to="/">Закончить прием</ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { Continue };
