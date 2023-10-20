import {
  BackLink,
  ButtonLink,
  Foot,
  QuizWrap,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';

interface Props {
  onBack: () => void;
}


const ShortLength = ({ onBack }: Props) => {

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

      <DiagnosisCard>
        Рекомендуется продолжение курса ранее проводимой терапии до общего срока в 8 недель
      </DiagnosisCard>

      <Foot $align="flex-end">
        <ButtonLink $type='light' to="/" >Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { ShortLength };
