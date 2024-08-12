import { useAppSelector } from '../../../../app/hooks';
import { QuizWrap, BackLink, Foot, ButtonLink, Text } from '../../../elements';
import { DiagnosisHeading, DiagnosisCard } from '../elements';
import { selectSelectedLPPMedicaments } from '../../../../store/lpp/medicamentsSlice';
import styled from 'styled-components';
import { Hepotoxicity } from '../../LPP/Hepotoxicity';
import {
  fda,
  glukokortikosteroides,
  hepatoprotectors,
  lppRiskMinimizationMem,
  paracetomolAntidote,
  patientMem,
  valproatAntidote,
} from './researches';
import { useMemo } from 'react';
import { InterpretationItem } from '../../InterpretationItem';
import { selectPrevBlocksHistory } from '../../../../store/utilsSlice';

interface Props {
  onBack: () => void;
}

const Meds = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const MedBtn = styled.div`
  padding: 14px 28px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 40px;

  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 32px;
`;

const LPPMedicamentsDiagnosis = ({ onBack }: Props) => {
  const selectedMeds = useAppSelector(selectSelectedLPPMedicaments);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);
    
  const isSingleTool = useMemo(() => blockHistory.length <= 1, [blockHistory])

  const diagnosisCards = useMemo(() => {
    const result = [];

    result.push(fda);

    if (selectedMeds.includes('Вальпроат')) {
      result.push(valproatAntidote);
    }

    if (selectedMeds.includes('Ацетаминофен (парацетамол)')) {
      result.push(paracetomolAntidote);
    }

    result.push(hepatoprotectors);
    result.push(glukokortikosteroides);

    return result;
  }, [selectedMeds]);

  const recommendations = [lppRiskMinimizationMem, patientMem];

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Meds>
        {selectedMeds.map((med, i) => (
          <MedBtn key={i}>{med}</MedBtn>    
        ))}
      </Meds>

      <DiagnosisHeading>Диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <span style={{ color: '#000' }}>ЛПП</span>
        Код по МКБ-10: К71
      </DiagnosisCard>

      <List>
        {diagnosisCards.map((item, i) => (
          <InterpretationItem item={item} key={item.title} />
        ))}
      </List>

      <hr />

      <DiagnosisHeading>Рекомендации</DiagnosisHeading>
      <List>
        {recommendations.map((item, i) => (
          <InterpretationItem item={item} key={item.title} />
        ))}
      </List>

      <Hepotoxicity selectedMeds={selectedMeds} />

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
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { LPPMedicamentsDiagnosis };
