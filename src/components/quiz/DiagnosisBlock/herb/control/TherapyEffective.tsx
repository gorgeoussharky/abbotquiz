import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Foot,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { useAppSelector } from '../../../../../app/hooks';
import { selectControlQuestions } from '../../../../../store/herb/controlAppointmentSlice';
import { Notification } from '../../../Notification';
import { egds } from '../../../../../store/herb/data/examinationsData';
import styled from 'styled-components';

interface Props {
  onBack: () => void;
}

const ResultButtonLink = styled(ButtonLink)`
    max-width: 100%;

    max-width: 100%;
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 24px;
  }
`

const TherapyEffective = ({ onBack }: Props) => {
  const controlQuestions = useAppSelector(selectControlQuestions);

  const hasEgdsResults = controlQuestions.find(
    (el) =>
      el.title ===
      'Есть ли у пациента результаты контрольного исследования ЭГДС?'
  )?.value?.value;

  const diagnosisEgds = () => {
    return {
      ...egds,
      title: 'Контрольная ЭГДС',
    };
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

      <DiagnosisCard>
        Лечение проведено эффективно, рекомендуется отменить ранее назначенную
        терапию
      </DiagnosisCard>

      {!hasEgdsResults && (
        <>
          <DiagnosisHeading>Дополнительные обследования</DiagnosisHeading>
          <Text>
            Для подтверждения решения об отмене терапии рекомендуется назначение
            пациенту контрольной ЭГДС.
          </Text>
        </>
      )}

      <Notification
        content='Для устойчивой ремиссии пациенту необходимо пожизненно придерживаться советов по модификации образа жизни <br>
      <a href="/cdss/pdf/lifestyle.pdf">памятка</a>'
      />

      {!hasEgdsResults && (
        <>
          <CardsList list={[diagnosisEgds()]} />
        </>
      )}

      <ResultButtonLink to="/secondary/">
        Результаты дополнительных исследований
      </ResultButtonLink>

      <Foot $align="flex-end">
        <ButtonLink $type='light' to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { TherapyEffective };
