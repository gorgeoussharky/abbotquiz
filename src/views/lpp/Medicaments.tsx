import { useEffect, useState } from 'react';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import {
  addBlockHistory,
  removeLastBlockHistoryElement,
  selectHasLastDiagnosis,
  selectPrevBlocksHistory,
} from '../../store/utilsSlice';
import { MedicamentsBlock } from '../../components/quiz/MedicamentsBlock';
import {
  selectLPPMedicaments,
  selectSelectedLPPMedicaments,
  removeMedicament,
  addMedicament,
  clearMedicaments,
} from '../../store/lpp/medicamentsSlice';

const totalSteps = 2;

const LPPMedicaments = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('medicaments');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const meds = useAppSelector(selectLPPMedicaments);
  const selectedMeds = useAppSelector(selectSelectedLPPMedicaments);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [block]);

  const stepTitle = () => {
    switch (step) {
      case 1:
        return 'Шаг 1: Сбор симптомов';
      case 2:
        return 'Шаг 2: Результаты';
      default:
        return '';
    }
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      case 'medicaments':
        setStep(2);
        setBlock('diagnosis');
        return;
    }
  };

  const handleBack = () => {
    switch (block) {
      case 'medicaments':
        setStep(1);
        break
    }

    if (block === 'medicaments') {
      navigate('/');
      return;
    }

    if (blockHistory.length > 0) {
      setBlock(blockHistory[blockHistory.length - 1]);
      dispatch(removeLastBlockHistoryElement());
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'medicaments':
        return (
          <MedicamentsBlock
            medicaments={meds.map((el) => el.name)}
            heading='Оценка принимаемых лекарственных и растительных средств и БАД'
            text="В поле ниже введите все лекарственные (по МНН) и растительные средства, а также БАДы, которые принимает пациент: "
            selected={selectedMeds}
            onRemove={(item) => dispatch(removeMedicament(item))}
            onSelect={(item) => dispatch(addMedicament(item))}
            onClear={() => dispatch(clearMedicaments())}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'diagnosis':
        return <DiagnosisBlock onBack={handleBack} />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <QuizCard>
        <ProgressBar step={step} totalSteps={totalSteps} title={stepTitle()} />
        <QuizBlock />
      </QuizCard>
    </Container>
  );
};

export { LPPMedicaments };
