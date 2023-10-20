import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';
import { complex, consultations, drugs, food, lifestyle, lowPeristalic, surgical, visit } from '../../../../../data/recommendations';

interface Props {
  onBack: () => void;
}

const IneffectivePeristalsis = ({ onBack }: Props) => {

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
        <div>Неэффективная перистальтика</div>
        Код по МКБ 22.9
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[visit, lowPeristalic, complex, diagnosisFood()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { IneffectivePeristalsis };
