import { useState } from 'react';
import { SourcesList } from '../components/SourcesList';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../components/elements';
import { ProgressBar } from '../components/ProgressBar';
import { InteractionsBlock } from '../components/quiz/InteractionsBlock';
import { MedicamentsBlock } from '../components/quiz/MedicamentsBlock';

const totalSteps = 2;

const Interactions = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('meds');

  const navigate = useNavigate();

  const stepTitle = () => {
    switch (step) {
      case 1:
        return 'Шаг 1: Выбор препаратов';
      case 2:
        return 'Шаг 2: Результаты проверки межлекарственного взаимодействия';
      default:
        return '';
    }
  };

  const handleNext = () => {

    switch (block) {
      case 'meds':
        setStep(2);
        setBlock('interactions');
        return;
    }
  };

  const handleBack = () => {
    if (block === 'meds') {
      navigate(-1);
      return;
    }

    if (block === 'interactions') {
        setBlock('meds')
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'meds':
        return <MedicamentsBlock onBack={handleBack} onNext={handleNext} />;
      case 'interactions':
        return <InteractionsBlock onBackToDiagnosis={() => navigate(-1)} onBack={handleBack} />;
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

      <SourcesList />
    </Container>
  );
};

export { Interactions };
