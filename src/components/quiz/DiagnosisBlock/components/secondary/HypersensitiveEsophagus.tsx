import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';
import { consultations, drugs, lifestyle } from '../../../../../data/recommendations';



interface Props {
  onBack: () => void;
}

const HypersensitiveEsophagus = ({ onBack }: Props) => {

  const diagnosisConsultations = () => {
    return {
      ...consultations,
      list: [
        'Консультация врача-психотерапевта'
      ]
    }
  }

  const diagnosisDrugs = () => {
    return {
      ...drugs,
      text: 'ИПП только у пациентов, у которых ИС >50%',
      linkLabel: 'Подробнее',
      link: 'https://www.gastrojournal.org/action/showPdf?pii=S0016-5085%2816%2900178-5',
      linkHasArrow: true,
    }
  }

  return (
    <div className="quiz-block">
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Гиперсенситивный пищевод</div>
        Код по МКБ 22.8
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[diagnosisDrugs(), lifestyle, diagnosisConsultations()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </div>
  );
};

export { HypersensitiveEsophagus };
