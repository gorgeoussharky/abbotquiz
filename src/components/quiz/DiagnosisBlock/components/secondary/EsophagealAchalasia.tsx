import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../elements';
import { dilatation, lifestyle, peroralTherapy, surgical } from '../../../../../data/recommendations';
import { hasExamination } from '../../../../../app/helpers';

interface Props {
  onBack: () => void;
}

const EsophagealAchalasia = ({ onBack }: Props) => {

   const hasEgds = hasExamination('ЭГДС')

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

    const diagnosisPeroralTherapy = () => {
      if (hasEgds) {
        return {
          ...peroralTherapy,
          title: 'Пероральная медикаментозная терапия в дооперационном периоде или при наличии противопоказаний к операции'
        }
      }

      return peroralTherapy
    }

    const diagnosisSurgical = () => {
        return {
            ...surgical,
            list: ['Миотомия по Геллеру', 'Пероральная эндоскопическая миотомия и др.'],
        }
    }

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <div>Ахалазия пищевода</div>
        Код по МКБ 22.0
      </DiagnosisCard>

      <DiagnosisHeading>Возможные рекомендации</DiagnosisHeading>

      <CardsList list={[diagnosisLifestyle(), diagnosisPeroralTherapy(), dilatation, diagnosisSurgical()]} />

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { EsophagealAchalasia };
