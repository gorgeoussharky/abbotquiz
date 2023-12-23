import { useEffect, useState } from 'react';
import { SymptomsBlock } from '../../components/quiz/SymptomsBlock';
import { SourcesList } from '../../components/SourcesList';
import { GerdQ } from '../../components/quiz/GerdQ';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { RecommendationsBlock } from '../../components/quiz/RecommendationsBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addSelectedSymptom,
  clearSelectedSymptoms,
  removeSelectedSymptom,
  selectSelectedSymptoms,
  selectSymptomsDB,
} from '../../store/herb/symptomsSlice';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import { resetAnswers } from '../../store/herb/gerdQQuestionsSlice';
import {
  addBlockHistory,
  removeLastBlockHistoryElement,
  selectHasLastDiagnosis,
  selectPrevBlocksHistory,
} from '../../store/utilsSlice';
import { Option } from '../../types/interfaces';

const totalSteps = 3;

const First = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('symptoms');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSymptoms = useAppSelector(selectSelectedSymptoms);

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const db = useAppSelector(selectSymptomsDB);

  useEffect(() => {
    if (hasLastDiagosis) {
      setBlock('diagnosis');
    }
  }, []);

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
        return 'Шаг 2: Уточняющие вопросы';
      case 3:
        return 'Шаг 3: Результаты первичного приема';
      default:
        return '';
    }
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      case 'gerdQ':
        setStep(3);
        setBlock('diagnosis');
        if (window.ym) {
          window.ym(90602537, 'reachGoal', 'cdss_end1');
        }
        return;
      case 'symptoms':
        // Кол-во пищеводных и внепищеводных
        const extraesophagealCount = selectedSymptoms.filter(
          (el) => el.type === 'Внепищеводные'
        ).length;
        const esophagealCount = selectedSymptoms.filter(
          (el) => el.type === 'Пищеводные'
        ).length;

        // Только внепищеводные
        if (extraesophagealCount && !esophagealCount) {
          setStep(3);
          setBlock('recommendations');
          return;
        }

        // Только пищеводные
        setStep(2);
        setBlock('gerdQ');
        return;
    }
  };

  const handleSymptomSelect = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(addSelectedSymptom(dbItem));
  };

  const handleSymptomRemove = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(removeSelectedSymptom(dbItem));
  };

  const handleBack = () => {
    if (block === 'symptoms') {
      navigate('/');
      dispatch(resetAnswers());
      dispatch(clearSelectedSymptoms());
      return;
    }

    if (blockHistory.length > 0) {
      setBlock(blockHistory[blockHistory.length - 1]);
      dispatch(removeLastBlockHistoryElement());
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'symptoms':
        return (
          <SymptomsBlock
            symptoms={db}
            selected={selectedSymptoms}
            onRemove={handleSymptomRemove}
            onSelect={handleSymptomSelect}
            onClear={() => dispatch(clearSelectedSymptoms())}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'gerdQ':
        return <GerdQ onBack={handleBack} onNext={handleNext} />;
      case 'diagnosis':
        return <DiagnosisBlock onBack={handleBack} />;
      case 'recommendations':
        return <RecommendationsBlock onBack={handleBack} />;
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

export { First };
