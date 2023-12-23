import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, Item, List, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import {
  drugs,
  lifestyle,
  surgical,
} from '../../../../../data/recommendations';
import styled from 'styled-components';
import { DosageList } from '../../../../DosageList';
import { useAppDispatch } from '../../../../../app/hooks';
import { setMedsToCheck } from '../../../../../store/utilsSlice';

interface Props {
  onBack: () => void;
}

const DrugsList = styled(List)`
  padding-left: 16px;
  margin-top: 8px;
  max-width: 460px;
`;

const DrugsDosageList = styled(DosageList)`
  @media (max-width: 991px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`

const Gpod = ({ onBack }: Props) => {
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

  const pyro = [
    {
      title: 'Итоприда гидрохлорид',
      dosage: '50 мг 3 раза в сутки',
    },
  ];

  const dispatch = useAppDispatch()
  const allMeds = () => {
    const items:string[] = []

    ipp.forEach(el => items.push(el.title))
    pyro.forEach(el => items.push(el.title))

    return items
  }
  
  dispatch(setMedsToCheck(allMeds()))

  const diagnosisLifestyle = () => {
    return {
      ...lifestyle,
      link: undefined,
      list: [
        'Тщательное пережевывание пищи',
        'Контроль позиции тела при приеме пищи',
        'Исключение газированных напитков и др.',
      ],
    };
  };

  const diagnosisSurgical = () => {
    return {
      ...surgical,
      text: 'Фундопликация',
    };
  };

  const diagnosisDrugs = () => {
    return {
      ...drugs,
      children: (
        <DrugsList>
          <Item>
            <DrugsDosageList list={ipp} title="ИПП на выбор" />
          </Item>

          <Item>
            <DrugsDosageList cols={1} list={pyro} title="Прокинетик" />
          </Item>
        </DrugsList>
      ),
    };
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Грыжа пищеводного отверстия диафрагмы (ГПОД)</div>
        Код по МКБ 44.9
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList
        list={[diagnosisLifestyle(), diagnosisDrugs(), diagnosisSurgical()]}
      />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { Gpod };
