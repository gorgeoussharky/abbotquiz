import { useEffect, useState } from 'react';
import { SymptomsBlock } from '../../components/quiz/SymptomsBlock';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { RecommendationsBlock } from '../../components/quiz/RecommendationsBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addSelectedSymptom,
  clearSelectedSymptoms,
  removeSelectedSymptom,
  selectSelectedSymptoms,
  selectSymptomsDB,
} from '../../store/lpp/symptomsSlice';
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
import { LPPType } from '../../components/quiz/LPP/LPPType';
import { resetValues, selectLPPType } from '../../store/lpp/lppTypeSlice';
import { MedicamentsBlock } from '../../components/quiz/MedicamentsBlock';
import { selectLPPMedicaments, selectSelectedLPPMedicaments, removeMedicament, addMedicament, clearMedicaments } from '../../store/lpp/medicamentsSlice';

const totalSteps = 3;

const LPPFirst = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('symptoms');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSymptoms = useAppSelector(selectSelectedSymptoms);
  const lppTypeAnswers = useAppSelector(selectLPPType);

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const db = useAppSelector(selectSymptomsDB);
  const meds = useAppSelector(selectLPPMedicaments)
  const selectedMeds = useAppSelector(selectSelectedLPPMedicaments);

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

  const isLowProb = () => {
    const answers = lppTypeAnswers

    // Проверка на превышение ГГТ
    const isHightGGT = () => {
      const base = answers.find(el => el.id === 'ggt')?.value_base || 0
      const max = answers.find(el => el.id === 'ggt')?.value_max || 0

      return base > max
    }

    // Проверка на превышение билирубина
    const isHighBili = () => {
      const base = answers.find(el => el.id === 'bili')?.value_base || 0
      const max = answers.find(el => el.id === 'bili')?.value_max || 0

      return base > max
    }

    // Проверка на превышение прямого билирубина
    const isHighDirectBili = () => {
      const base = answers.find(el => el.id === 'direct_bili')?.value_base || 0
      const max = answers.find(el => el.id === 'direct_bili')?.value_max || 0

      return base > max
    }

    // Проверка на превышение АСТ в два раза
    const isHighAST = () => {
      const base = answers.find(el => el.id === 'ast')?.value_base || 0
      const max = answers.find(el => el.id === 'ast')?.value_max || 0

      return base > max * 2
    }

    // Проверка на превышение АЛТ в два раза
    const isHighALT = () => {
      const base = answers.find(el => el.id === 'alt')?.value_base || 0
      const max = answers.find(el => el.id === 'alt')?.value_max || 0

      return base > max * 2
    }

    const result = () => {
      const highBili = isHighBili() || isHighDirectBili()

      console.log(isHightGGT() && !isHighALT() && !isHighAST() && !highBili)

      // Повышен ТОЛЬКО уровень ГГТ, остальное - без отклонений - ЛПП маловероятен
      if (isHightGGT() && !isHighALT() && !isHighAST() && !highBili) {
        return true;
      }

      // Повышен ТОЛЬКО билирубин общий/билирубин прямой, остальное - без отклонений
      if (highBili && !isHighALT() && !isHighAST() && !isHightGGT()) {
        return true;
      }

      // АСТ повышен менее, чем в 2 раза
      if (!isHighAST()) {
        return true;
      }

      // АЛТ повышен менее, чем в 2 раза
      if (!isHighALT()) {
        return true;
      }

      return false
    }

    return result()
  }

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      case 'symptoms':
        setStep(2);
        setBlock('lppType');
        return;

      case 'lppType':
        if (isLowProb()) {
          setStep(3);
          setBlock('diagnosis');
          return
        }

        setBlock('medicaments')
        return;

      case 'medicaments':
        setBlock('diagnosis');
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

    // Clearing results on back navigation
    switch (block) {
      case 'symptoms':
        dispatch(clearSelectedSymptoms());
        break;
      case 'lppType':
        dispatch(resetValues());
        break;
      case 'medicaments':
        dispatch(clearMedicaments());
    }

    if (block === 'symptoms') {
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
      case 'lppType':
        return <LPPType onBack={handleBack} onNext={handleNext} />;
      case 'diagnosis':
        return <DiagnosisBlock onBack={handleBack} />;
      case 'medicaments':
        return <MedicamentsBlock
          medicaments={meds.map(el => el.name)}
          text="В поле ниже введите все лекарственные (по МНН) и растительные средства, а также БАДы, которые принимает пациент: "
          selected={selectedMeds}
          onRemove={(item) => dispatch(removeMedicament(item))}
          onSelect={(item) => dispatch(addMedicament(item))}
          onClear={() => dispatch(clearMedicaments())}
          onBack={handleBack}
          onNext={handleNext}
          />
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

export { LPPFirst };
