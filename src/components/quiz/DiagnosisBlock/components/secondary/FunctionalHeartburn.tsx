import { rentgenometry } from '../../../../../data/examinationsData';
import { alternative, drugs, lifestyle, schedule } from '../../../../../data/recommendations';
import { DosageList } from '../../../../DosageList';
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
  QuizWrap,
  Text,
} from '../../../../elements';
import { getAnswer } from '../../../../../app/helpers';
import { DiagnosisHeading, DiagnosisCard } from '../elements';

interface Props {
  onBack: () => void;
}

const FunctionalHeartburn = ({ onBack }: Props) => {

    const diagnosisLifestyle = () => {
        return {
            ...lifestyle,
            link: undefined,
            list: [
                'Нормализация сна',
                'Снижение уровня стресса',
            ]
        }
    }

    const diagnosisDrugs = () => {
      return {
        ...drugs,
        link: 'https://www.gastro.ru/userfiles/R_AhalKard_2016.pdf',
        linkHasArrow: true,
        linkLabel: 'Подробнее',
      }
    }

    const diagnosisAlternative = () => {
        return {
            ...alternative,
            list: ['Акупунктура']
        }
    }

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

          <DiagnosisCard>
            <div>Функциональная изжога</div>
            Код по МКБ 22.9
          </DiagnosisCard>
          
          <CardsList
            notifications={[
              'Для подтверждения диагноза необходимо исключить такие состояния, как: эозинофильный эзофагит, срыгивание (руминация)'
            ]}
          />


        </Column>

        <Column>
          <Heading>Возможные Рекомендации</Heading>

          <CardsList title="Дополнительно" list={[diagnosisLifestyle(), diagnosisDrugs(), diagnosisAlternative()]} />

          <Foot $align="flex-end">
            <ButtonLink to="/">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { FunctionalHeartburn };
