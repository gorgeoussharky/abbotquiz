import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';

interface Props {
  onBack: () => void;
}

const EsophagealMotilityDisorders = ({ onBack }: Props) => {

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Результаты диагностики</DiagnosisHeading>

      <DiagnosisCard>
      <div>
          <span>Вероятный диагноз: нарушения моторики пищевода или функциональная изжога.</span>
          <div>Для подтверждения диагноза рекомендуется проведение манометрии высокого разрешения.</div>
      </div>
      </DiagnosisCard>


      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { EsophagealMotilityDisorders };
