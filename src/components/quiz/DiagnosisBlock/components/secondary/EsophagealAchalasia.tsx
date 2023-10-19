import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';
import { dilatation, lifestyle, peroralTherapy, surgical } from '../../../../../data/recommendations';

interface Props {
  onBack: () => void;
}

const EsophagealAchalasia = ({ onBack }: Props) => {

    const diagnosisLifestyle = () => {
        return {
            ...lifestyle,
            link: undefined,
            list: [
                'Тщательное пережевывание пищи',
                'Контроль позиции тела при приеме пищи',
                'Исключение газированных напитков и др.'
            ]
        }
    }

    const diagnosisSurgical = () => {
        return {
            ...surgical,
            list: ['Миотомия по Геллеру', 'Пероральная эндоскопическая миотомия и др.'],
        }
    }

  return (
    <div className="quiz-block">
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Ахалазия пищевода</div>
        Код по МКБ 22.0
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[diagnosisLifestyle(), peroralTherapy, dilatation, diagnosisSurgical()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </div>
  );
};

export { EsophagealAchalasia };
