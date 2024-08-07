import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  Item,
  List,
  Notice,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { DosageList } from '../../../../DosageList';
import {
  DosageItem,
  RecommendationCardType,
  Option,
  QuestionEntry
} from '../../../../../types/interfaces';

import tube from '../../../../../assets/img/tube.png';
import kidney from '../../../../../assets/img/kidney.png';
import stomach from '../../../../../assets/img/stomach.png';
import egds from '../../../../../assets/img/egds.png';
import schedule from '../../../../../assets/img/schedule.png';
import doctor from '../../../../../assets/img/doctor.png';
import { setMedsToCheck } from '../../../../../store/utilsSlice';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectSrkExaminations } from '../../../../../store/srk/examinationsSlice';
import { useMemo } from 'react';

interface Props {
  onBack: () => void;
}

interface DosageListType {
  title: string;
  level?: string;
  items: DosageItem[];
}

const Srk = ({ onBack }: Props) => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(selectSrkExaminations);

  const bsfkAnswer = useMemo(
    () => questions.find((el) => el.group === 'bsfk')?.value?.value,
    [questions]
  );

  const diagnosis = useMemo(() => {
    switch (bsfkAnswer) {
      case 1:
        return {
          title: 'СРК с запором',
          code: 'Код по МКБ-10: K58.2',
        };
      case 2:
        return {
          title: 'СРК с диареей',
          code: 'Код по МКБ-10: K58.1',
        };
      case 3:
        return {
          title: 'СРК смешанного типа',
          code: 'Код по МКБ-10: K58.3',
        };
      case 4:
        return {
          title: 'Неклассифицируемый СРК',
          code: 'Код по МКБ-10: K58.8',
        };
      default:
        break;
    }
  }, [bsfkAnswer]);

  const recommendations = () => {
    const list = [] as RecommendationCardType[]

    const labResearches = questions.find(el => el.id === 'lab_researches')
    const instumentalResearches = questions.find(el => el.id === 'instrumental_researches')
    const additionalResearches = questions.find(el => el.id === 'additional_researches')

    const findUnselected = (researches: QuestionEntry) => {
      if (!researches.value?.value) return

      // Find selected
      const selected = JSON.parse(researches.value.value as string) as Option[]

      // Find unselected
      const notSelected = researches?.options?.filter((option) => {

        // If selected not contains value from options = add it to unselected
        if (!selected.some(selectedEl => option.value === selectedEl.value)) return true

        return false
      })

      return notSelected
    }

    if (labResearches?.value?.value) {
      list.push({
        title:
          'Лабораторные диагностические исследования',
        list: findUnselected(labResearches)?.map(el => el.label) as string[],
        icon: tube,
      })
    }

    if (instumentalResearches?.value?.value) {
      list.push({
        title:
          'Инструментальные диагностические исследования:',
        list: findUnselected(instumentalResearches)?.map(el => el.label) as string[],
        icon: kidney,
      })
    }

    if (additionalResearches?.value?.value) {
      list.push({
        title:
          'Дополнительные исследования',
        list: findUnselected(additionalResearches)?.map(el => el.label) as string[],
        icon: doctor,
      })
    }

    list.push({
      title:
        'Проведение гистологического исследования образцов ткани толстой кишки для исключения диагноза “Микроскопический колит”',
      icon: kidney,
    })

    return list
  }

  const usefulMaterials = [
    {
      title: 'Памятки по подготовке к исследованиям',
      icon: stomach,
      expandable: true,
      unlist: true,
      list: [
        'Колоноскопия <a href="/cdss/pdf/colono.pdf" target="_blank" rel="noopener">Скачать</a>',
        'УЗИ <a href="/cdss/pdf/uzi.pdf" target="_blank" rel="noopener">Скачать</a>',
        'Анализ кала <a href="/cdss/pdf/feces.pdf" target="_blank" rel="noopener">Скачать</a>',
      ],
    },
    {
      title: 'Памятки по питанию и модификации образа жизни',
      icon: egds,
      expandable: true,
      unlist: true,
      list: [
        'Дневник наблюдения <a href="/cdss/pdf/diary.pdf" target="_blank" rel="noopener">Скачать</a>',
        'Рекомендации по изменению образа жизни и пищевого поведения <a href="/cdss/pdf/diet.pdf" target="_blank" rel="noopener">Скачать</a>',
      ],
    },
  ];

  const additional = [
    {
      title:
        'Контрольный прием через 3 месяца для оценки эффективности проводимого лечения',
      icon: schedule,
    },
  ];

  const allDosage = useMemo(() => {
    const list: DosageListType[] = [];

    list.push({
      title: 'Спазмолитики',
      level: 'A1',
      items: [
        {
          title: 'Мебеверин',
          dosage: '200 мг 2 раза в день',
        },
        {
          title: 'Гиосцина бутилбромид',
          dosage: `Внутрь: 10-20 мг 3-5 раз в день <br>
          Ректально: 10-20 мг 3-5 раз в день`,
        },
        {
          title: 'Пинаверия бромид',
          dosage: '50-100 мг 2-3 раза в день',
        },
      ],
    });

    list.push({
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
    });

    if (diagnosis?.title !== 'СРК с диареей') {
      list.push({
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
      });
    }

    if (diagnosis?.title !== 'СРК с запором') {
      list.push({
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
      });
    }

    return list;
  }, [bsfkAnswer]);

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

          <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

          <DiagnosisCard style={{ gap: 0 }}>
            <div style={{ color: 'var(--accent)' }}>{diagnosis?.title}</div>
            {diagnosis?.code}
          </DiagnosisCard>

          <DiagnosisHeading>Рекомендации</DiagnosisHeading>

          <CardsList blueNotifications hasBorder list={recommendations()} />

          <CardsList
            blueNotifications
            hasBorder
            list={usefulMaterials}
            title="Полезные материалы"
          />

          <CardsList
            blueNotifications
            title="Дополнительно"
            list={additional}
          />
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

          {diagnosis?.title !== 'СРК с запором' && (
            <>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                Пробиотики, содержащие различные штаммы <br /> лакто- и
                бифидобактерий:
              </div>
              <div
                style={{
                  color: 'var(--accent)',
                  marginBottom: 12,
                  fontSize: 16,
                }}
              >
                Уровень рекомендаций А2
              </div>
              <List>
                <Item>
                  Должны содержать не менее миллиарда (10^9) бактериальных клеток в капсуле
                </Item>
                <Item>
                  В виде капсул, покрытых кишечнорастворимой оболочкой, или в виде микрокапсулированных пробиотических препаратов
                </Item>
              </List>
            </>
          )}

          <Notice style={{ marginBottom: 12, fontSize: 20 }}>
            В клинических рекомендациях по лечению СРК также приведены
            гомеопатические препараты.
            <a rel='noreferrer nofollow' target="_blank" href="https://cr.minzdrav.gov.ru/schema/190_2">
              Подробнее
            </a>
          </Notice>

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

          <InteractionsLinkBtn routePrefix='/srk' />

          <Foot $align="flex-end">
            <ButtonLink to="/">Закончить прием</ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { Srk };
