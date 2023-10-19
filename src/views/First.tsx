import { useState } from 'react';
import { SymptomsBlock } from '../components/quiz/SymptomsBlock/SymptomsBlock';
import { SourcesList } from '../components/SourcesList/SourcesList';
import { GerdQ } from '../components/quiz/GerdQ/GerdQ';
import { DiagnosisBlock } from '../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { RecommendationsBlock } from '../components/quiz/RecommendationsBlock/RecommendationsBlock';
import { useAppSelector } from '../app/hooks';
import { selectSelectedSymptoms } from '../store/symptomsSlice';
import { useNavigate } from 'react-router-dom';

const totalSteps = 3;

const First = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('symptoms');
  const [prevBlock, setPrevBlock] = useState<string[]>([])

  const navigate = useNavigate();
  const selectedSymptoms = useAppSelector(selectSelectedSymptoms);

  const stepTitle = () => {
    switch (step) {
      case 1:
        return 'Шаг 1: Сбор симптомов';
      case 2:
        return 'Шаг 2: Уточняющие вопросы';
      case 3:
        return 'Шаг 3: Результаты первичного приема';
    }
  };

  const progress = () => {
    return `${Math.round((step / totalSteps) * 100)}%`;
  };

  const handleNext = () => {
    setPrevBlock(prevBlock.concat(block));

    switch (block) {
      case 'questions':
        setStep(3);
        setBlock('diagnosis');
        return;
      case 'symptoms':
        // Find extraesophageal and esophageal symptoms count
        const extraesophagealCount = selectedSymptoms.filter(
          (el) => el.type === 'Внепищеводные'
        ).length;
        const esophagealCount = selectedSymptoms.filter(
          (el) => el.type === 'Пищеводные'
        ).length;

        // Extraesophageal only
        if (extraesophagealCount && !esophagealCount) {
          setStep(3);
          setBlock('recommendations');
          return;
        }

        // Esophageal only and both
        setStep(2);
        setBlock('questions');
        return;
    }
  };

  const handleBack = () => {
    if (block === 'symptoms') {
      navigate('/')
      return
    }

    
    if (prevBlock.length > 0) {
      setBlock(prevBlock[prevBlock.length - 1]);
      setPrevBlock(prevBlock.slice(0, -1));
    }
   
  };

  const QuizBlock = () => {
    switch (block) {
      case 'symptoms':
        return <SymptomsBlock onBack={handleBack} onNext={handleNext} />;
      case 'questions':
        return <GerdQ onBack={handleBack} onNext={handleNext} />;
      case 'diagnosis':
        return <DiagnosisBlock onBack={handleBack}  />;
      case 'recommendations':
        return <RecommendationsBlock onBack={handleBack} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="container">
      <div className="quiz__card">
        <div className="quiz__head">
          <div className="quiz__head-label">{stepTitle()}</div>
          <div className="quiz__percent">{progress()}</div>
          <div className="quiz__progress">
            <span style={{ width: progress() }}></span>
          </div>
        </div>

        <QuizBlock />
      </div>

      <div className="gastro-calculator-btn-wrap">
        <SourcesList />
      </div>
    </div>
  );
};

export { First };
