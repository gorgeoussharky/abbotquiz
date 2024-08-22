import { useAppSelector } from '../../../../app/hooks';
import { LowProb } from './first/LowProb';
import { selectLPPType } from '../../../../store/lpp/lppTypeSlice';
import { HighProb } from './first/HighProb';
import { selectRucamList } from '../../../../store/lpp/rucamSlice';
import { useMemo } from 'react';
import { QuizWrap, BackLink, Foot, ButtonLink, Text, Button } from '../../../elements';
import { DiagnosisHeading, DiagnosisCard } from '../elements';
import { selectPrevBlocksHistory } from '../../../../store/utilsSlice';

interface Props {
  onBack: () => void;
  onReset: () => void;
}

const RucamDiagnosis = ({ onBack, onReset }: Props) => {
    const rucamList = useAppSelector(selectRucamList)
    const blockHistory = useAppSelector(selectPrevBlocksHistory);
    
    const isSingleTool = useMemo(() => {
      return blockHistory.length && blockHistory[0] === 'lppType_rucam'
    }, [blockHistory])

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

          <Text>Если в поражении печени подозреваются несколько препаратов, то шкалу RUCAM необходимо применять <b>к каждому препарату отдельно</b></Text>

          <Text>Если это невозможно (например, при назначении комбинации противотуберкулезных средств все препараты могут быть причастны к развитию ЛПП), следует прибегать к мнению специалистов и ранжировать вероятность различных ЛС как причины ЛПП на основании фенотипа поражения и сопоставления с данными литературы</Text>

          
      {isSingleTool && (
        <>
          <Text>
            В отсутствие специфических антидотов для лечения ЛПП используются
            средства, способные либо уменьшить симптомы, либо воздействовать на
            определенные патогенетические механизмы их развития. К таким
            препаратам относятся: адеметионин, инозин + меглюмин + метионин +
            никотинамид + янтарная кислота, эссенциальные фосфолипиды, бициклол,
            УДХК и др. <sup>1,2</sup>
          </Text>
          <Text>
            На сегодняшний день среди препаратов, используемых для коррекции
            ЛПП, наибольшей доказательной базой обладает <b>адеметионин.</b>
            <sup>3</sup>
          </Text>
          <Text>
            Адеметионин – естественная аминокислота, способная повышать уровень
            глутатиона в митохондриях и поддерживать их функциональную
            активность, инактивировать CYP2E1, подавлять экспрессию ФНО-α. Всё
            это легло в основу его широкого применения в клинической практике, в
            том числе при ЛПП. Важную роль в этом аспекте играют
            <b>антифибротические, антинейротоксические и антидепрессивные</b> свойства
            адеметионина.<sup>1</sup>
          </Text>
        </>
      )}
    
          <Foot $align="flex-end">
            <Button style={{maxWidth: 340}} onClick={onReset}>Оценить другой препарат по RUCAM</Button>
            <ButtonLink to="/">Закрыть</ButtonLink>
          </Foot>
        </QuizWrap>
      );
}

export { RucamDiagnosis };