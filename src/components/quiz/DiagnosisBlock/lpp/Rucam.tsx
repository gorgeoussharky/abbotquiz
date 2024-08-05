import { useAppSelector } from '../../../../app/hooks';
import { LowProb } from './first/LowProb';
import { selectLPPType } from '../../../../store/lpp/lppTypeSlice';
import { HighProb } from './first/HighProb';
import { selectRucamList } from '../../../../store/lpp/rucamSlice';
import { useMemo } from 'react';
import { QuizWrap, BackLink, Foot, ButtonLink, Text, Button } from '../../../elements';
import { DiagnosisHeading, DiagnosisCard } from '../elements';

interface Props {
  onBack: () => void;
  onReset: () => void;
}

const RucamDiagnosis = ({ onBack, onReset }: Props) => {
    const rucamList = useAppSelector(selectRucamList)

    const rucamScore = useMemo(() => {
        return rucamList.reduce((acc, el) => {
            if (!el.value || !el.value.score) return acc

            return acc + el.value.score
        }, 0)
    }, [rucamList])

    const diagnosis = useMemo(() => {
        if (rucamScore <= 0) {
            return 'Взамосвязь исключена'
        }

        if (rucamScore <= 2) {
            return 'Взамосвязь маловероятна'
        }

        if (rucamScore <= 5) {
            return 'Взамосвязь возможна'
        }

        if (rucamScore <= 8) {
            return 'Взамосвязь вероятна'
        }

        return 'Взамосвязь высоковероятна'
    }, [rucamScore])

    return (
        <QuizWrap>
          <BackLink onClick={onBack}>Назад</BackLink>
    
          <DiagnosisHeading>Оценка по шкале RUCAM</DiagnosisHeading>
    
          <DiagnosisCard>
            <span>{diagnosis}</span>
          </DiagnosisCard>

          <Text>Если в поражении печени подозреваются несколько препаратов, то шкалу RUCAM необходимо применять к каждому препарату отдельно</Text>

          <Text>Если это невозможно (например, при назначении комбинации противотуберкулезных средств все препараты могут быть причастны к развитию ЛПП), следует прибегать к мнению специалистов и ранжировать вероятность различных ЛС как причины ЛПП на основании фенотипа поражения и сопоставления с данными литературы</Text>
    
          <Foot $align="flex-end">
            <Button style={{maxWidth: 340}} onClick={onReset}>Оценить другой препарат по RUCAM</Button>
            <ButtonLink to="/">Закрыть</ButtonLink>
          </Foot>
        </QuizWrap>
      );
}

export { RucamDiagnosis };