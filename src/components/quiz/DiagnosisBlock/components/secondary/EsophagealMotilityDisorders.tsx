import { BackLink, ButtonLink, Foot } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';

interface Props {
  onBack: () => void;
}

const EsophagealMotilityDisorders = ({ onBack }: Props) => {

  return (
    <div className="quiz-block">
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
    </div>
  );
};

export { EsophagealMotilityDisorders };
