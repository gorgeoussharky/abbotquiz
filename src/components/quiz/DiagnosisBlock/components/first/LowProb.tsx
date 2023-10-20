import {
  BackLink,
  ButtonLink,
  Foot,
  QuizWrap,
} from '../../../../elements';
import { DiagnosisHeading, DiagnosisCard } from '../elements';

interface Props {
  onBack: () => void;
}

const LowProb = ({ onBack }: Props) => {
  
  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Результаты диагностики</DiagnosisHeading>

      <DiagnosisCard>
        <span>Диагноз ГЭРБ маловероятен.</span>
        Рекомендовано продолжить диагностический поиск в других нозологиях
      </DiagnosisCard>


      <Foot $align="flex-end">
        <ButtonLink $type='light' to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { LowProb };
