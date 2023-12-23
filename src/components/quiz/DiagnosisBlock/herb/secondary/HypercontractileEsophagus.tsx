import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { consultations, drugs, lifestyle, surgical } from '../../../../../data/recommendations';

interface Props {
  onBack: () => void;
}

const HypercontractileEsophagus = ({ onBack }: Props) => {

      const diagnosisLifestyle = () => {
        return {
            ...lifestyle,
            link: undefined,
            list: [
                'Тщательное пережевывание пищи',
                'Контроль позиции тела при приеме пищи',
            ]
        }
    }

    const diagnosisDrugs = () => {
      return {
        ...drugs,
        link: 'https://www.gastro.ru/userfiles/R_AhalKard_2016.pdf',
        linkLabel: 'Подробнее',
        linkHasArrow: true
      }
    }

    const diagnosisSurgical = () => {
        return {
            ...surgical,
            text: 'Пероральная эндоскопическая миотомия и др.'
        }
    }
    
     

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Гиперконтрактильный пищевод</div>
        Код по МКБ 22.9
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[diagnosisLifestyle(), diagnosisDrugs(), diagnosisSurgical()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { HypercontractileEsophagus };
