import { BackLink, ButtonLink, Foot } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';

interface Props {
  onBack: () => void;
}

const Ambiguous = ({ onBack }: Props) => {

  return (
    <div className="quiz-block">
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Результаты диагностики</DiagnosisHeading>

      <DiagnosisCard>
      <div>
          <span>Результаты исследования неоднозначны.</span>
          <div>Для постановки диагноза необходимо проведение ЭГДС и комплексное рассмотрение картины на ЭГДС, количество эпизодов рефлюкса и % времени pH {'< 4'}</div>
      </div>
      </DiagnosisCard>


      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </div>
  );
};

export { Ambiguous };
