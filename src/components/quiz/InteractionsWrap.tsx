import { useEffect, useState } from 'react';
import { SourcesList } from '../SourcesList';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../elements';
import { ProgressBar } from '../ProgressBar';
import { InteractionsBlock } from './InteractionsBlock';
import { MedicamentsBlock } from './MedicamentsBlock';
import { InteractionDBEntry } from '../../types/interfaces';

const totalSteps = 2;

interface Props {
  medicaments: string[];
  interactions: {
    [key: string]: InteractionDBEntry[]
  };
}

const InteractionsWrap = ({ medicaments, interactions }: Props) => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('meds');

  const navigate = useNavigate();

  const [selectedMedicaments, setSelectedMedicaments] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [block]);

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
      setBlock('meds');
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'meds':
        return (
          <MedicamentsBlock
            medicaments={medicaments}
            onClear={() => setSelectedMedicaments([])}
            onRemove={(item) =>
              setSelectedMedicaments(
                selectedMedicaments.filter((el) => el !== item)
              )
            }
            onSelect={(item) => {
              if (!selectedMedicaments.includes(item)) {
                setSelectedMedicaments(selectedMedicaments.concat(item));
              }
            }}
            selected={selectedMedicaments}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'interactions':
        return (
          <InteractionsBlock
            selectedMeds={selectedMedicaments}
            interactionsDB={interactions}
            onBackToDiagnosis={() => navigate(-1)}
            onBack={handleBack}
          />
        );
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

export { InteractionsWrap };
