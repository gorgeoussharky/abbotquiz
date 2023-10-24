import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  QuizWrap,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';
import { useAppSelector } from '../../../../../app/hooks';
import { selectControlQuestions } from '../../../../../store/controlAppointmentSlice';
import { Notification } from '../../../Notification';
import { egds } from '../../../../../data/examinationsData';
import styled from 'styled-components';
import {
  drugs,
  drugsBottle,
  lifestyle,
  schedule,
} from '../../../../../data/recommendations';

interface Props {
  onBack: () => void;
}

const ResultButtonLink = styled(ButtonLink)`
  max-width: 100%;
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 24px;
  }
`;

const TherapyCorrection = ({ onBack }: Props) => {
  const controlQuestions = useAppSelector(selectControlQuestions);

  const hasEgdsResults = controlQuestions.find(
    (el) =>
      el.title ===
      'Есть ли у пациента результаты контрольного исследования ЭГДС?'
  )?.value?.value;

  const recommendations = [
    {
      ...drugs,
      title:
        'Рассмотреть возможность снижения дозы ИПП до 1/2 суточной дозы или перехода на режим приема ИПП «по требованию»',
    },
    drugsBottle,
    {
      ...schedule,
      title: 'Мониторинг в течение 4-12 недель',
    },
    {
      ...lifestyle,
      title:
        'Придерживаться рекомендаций по изменению образа жизни и пищевого поведения',
      link: '',
    },
  ];

  const diagnosisEgds = {
    ...egds,
    title:
      'Рекомендуется назначить контрольную ЭГДС для решения об отмене терапии',
  };

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

          <DiagnosisCard>Рекомендуется коррекция терапии</DiagnosisCard>

          <DiagnosisHeading>Фармакотерапия</DiagnosisHeading>

          <CardsList list={recommendations} />

          {!hasEgdsResults && (
            <>
              <DiagnosisHeading>Дополнительные обследования</DiagnosisHeading>
              <CardsList list={[diagnosisEgds]} />
            </>
          )}
        </Column>

        <Column>
          <CardsList
            notifications={[
              `Для устойчивой ремиссии пациенту необходимо пожизненно придерживаться советов по модификации образа жизни <br>
            <a href="/cdss/pdf/lifestyle.pdf">Памятка для пациента</a>`,
              `Если эпизоды ГЭРБ повторяются <b>3-7 дней подряд и влияют на повседневную активность</b>, рекомендуется возврат к ранее назначенной схеме терапии`,
            ]}
          />

          <ResultButtonLink to="/secondary/">
            Результаты дополнительных исследований
          </ResultButtonLink>

          <Foot $align="flex-end">
            <ButtonLink $type="light" to="/">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { TherapyCorrection };
