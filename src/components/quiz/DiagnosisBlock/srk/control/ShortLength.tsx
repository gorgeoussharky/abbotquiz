import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { Notification } from '../../../Notification';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';

interface Props {
  onBack: () => void;
}

const ShortLength = ({ onBack }: Props) => {
  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

      <DiagnosisCard>
        Рекомендуется продолжение курса ранее проводимой терапии до общего срока
        в 3 месяца.
      </DiagnosisCard>

      <Notification content="<p style='font-size: 24px; margin:0; font-weight: 700'>Если тяжесть симптомов СРК сильно ухудшает качество жизни пациента, рекомендуется рассмотреть возможность коррекции терапии и/или направления на&nbsp;консультацию к&nbsp;врачу-психиатру.</p>" />

      <Foot $align="flex-end">
        <ButtonLink $type="light" to="/">
          Закончить прием
        </ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { ShortLength };
