import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';
import {
  consultations,
  dilatation,
  drugs,
  food,
  lifestyle,
  surgical,
  visit,
} from '../../../../../data/recommendations';

interface Props {
  onBack: () => void;
}

const NoPeristalsis = ({ onBack }: Props) => {
  const diagnosisFood = () => {
    return {
      ...food,
      list: [
        'Отдавать предпочтение нетвердой или размягченной пище',
        'Тщательно пережевывать пищу',
        'Запивать еду достаточным количеством жидкости',
        'Не переедать и прекратить последний прием пищи за 4 часа до сна',
      ],
    };
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Нарушение двигательной функции грудного отдела пищевода, отсутствие перистальтики</div>
        Код по МКБ 22.0
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[visit, diagnosisFood()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { NoPeristalsis };
