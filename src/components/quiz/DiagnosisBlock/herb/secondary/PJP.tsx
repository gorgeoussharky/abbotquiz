import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { consultations, dilatation, drugs, lifestyle, surgical } from '../../../../../data/recommendations';

interface Props {
  onBack: () => void;
}

const PJP = ({ onBack }: Props) => {

    const diagnosisDilatation = () => {
        return {
            ...dilatation,
            title: 'Дилатационная терапия с/без постановки стента',
            list: [
                'Стандартная', 'Пневматическая'
            ]
        }
    }

      const diagnosisDrugs = () => {
        return {
            ...drugs,
            text: 'Назначение системных лекарственных препаратов неэффективно, <b>но ИПП могут облегчать симптомы</b>'
        }
    }

    const diagnosisSurgical = () => {
        return {
            ...surgical,
            list: ['Миотомия по Геллеру', 'Пероральная эндоскопическая миотомия и др.']
        }
    }
    
     

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Нарушение проходимости пищеводно-желудочного перехода (ПЖП)</div>
        Код по МКБ 22.9
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[diagnosisDilatation(), diagnosisSurgical(), diagnosisDrugs()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { PJP };
