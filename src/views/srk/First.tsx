import { useEffect, useState } from 'react';
import { SymptomsBlock } from '../../components/quiz/SymptomsBlock';
import { SourcesList } from '../../components/SourcesList';
import { GerdQ } from '../../components/quiz/GerdQ';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { RecommendationsBlock } from '../../components/quiz/RecommendationsBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import { selectRim4Questions, setRim4Answer } from '../../store/srk/rim4Slice';
import { selectSrkSelectedSymptoms, selectSrkSymptomsDB, addSrkSelectedSymptom, removeSrkSelectedSymptom, clearSrkSelectedSymptoms } from '../../store/srk/symptomsSlice';

const totalSteps = 3;

const SrkFirst = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('symptoms');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSymptoms = useAppSelector(selectSrkSelectedSymptoms);

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const db = useAppSelector(selectSrkSymptomsDB);
  const rim4Questions = useAppSelector(selectRim4Questions);

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

    const isLowProb = () => {
      const srkTypes = ['Боль в животе', 'Диарея', 'Запор'];

      // Поиск по соотвествующим группам и подсчет количества подходящих симптомов
      return !selectedSymptoms.filter((el) => {
        return srkTypes.some((type) => el.type === type);
      }).length;
    };

    switch (block) {
      case 'symptoms':
        if (isLowProb()) {
          
          setStep(3);
          setBlock('diagnosis');
          return;
        }
        setStep(2);
        setBlock('rim4');
        return;
      case 'rim4':
        setStep(3);
        setBlock('diagnosis');
        return;
    }
  };

  const handleSymptomSelect = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(addSrkSelectedSymptom(dbItem));
  };

  const handleSymptomRemove = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(removeSrkSelectedSymptom(dbItem));
  };

  const handleBack = () => {
    if (block === 'symptoms') {
      navigate('/');
      dispatch(resetAnswers());
      dispatch(clearSrkSelectedSymptoms());
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
            onClear={() => dispatch(clearSrkSelectedSymptoms())}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'rim4':
        return (
          <>
          <QuestionsBlock
            title="Опрос по критериям Рим IV"
            questions={rim4Questions}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRim4Answer({
                  id: id,
                  option: val,
                })
              )
            }
          />
          <div>*ВЗК — воспалительные заболевания кишечника</div>
          </>
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

      <SourcesList />
    </Container>
  );
};

export { SrkFirst };
