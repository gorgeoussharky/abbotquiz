import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisHeading } from '../../elements';

interface Props {
  onBack: () => void;
}

const NoEgds = ({ onBack }: Props) => {

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Для оценки полной клинической картины заболевания и постановки корректного диагноза пациенту рекомендуется проведение ЭГДС.</DiagnosisHeading>

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { NoEgds };
