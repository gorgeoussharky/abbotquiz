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
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import {
  clearLPPSecondaryAnswer,
  selectLPPSecondaryAnswers,
  setLPPSecondaryAnswer,
} from '../../store/lpp/secondarySlice';
import { Option } from '../../types/interfaces';

const totalSteps = 3;

const LPPSecondary = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('lpp_type');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const lppSecondaryAnswers = useAppSelector(selectLPPSecondaryAnswers);

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
        return 'Шаг 1: Уточняющие вопросы';
      case 2:
        return 'Шаг 1: Уточняющие вопросы';
      case 3:
        return 'Шаг 2: Определение диагноза и составление плана терапии';
      default:
        return '';
    }
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    if (!lppSecondaryAnswers.find((el) => el.id === 'lpp_type')?.value?.value)
      return;

    const type: Option[] = JSON.parse(
      lppSecondaryAnswers.find((el) => el.id === 'lpp_type')?.value
        ?.value as string
    );

    switch (block) {
      case 'lpp_type':
        setStep(2);

        if (type.some((el) => el.value === 'hollistic')) {
          setBlock('patologies_holestatic');
        } else {
          setBlock('patologies_mixed');
        }
        return;

      case 'patologies_holestatic':
        setStep(3);
        setBlock('diagnosis');
        return;
      case 'patologies_mixed':
        setStep(3);
        setBlock('diagnosis');
        return;
    }
  };

  const handleBack = () => {
    // Clearing results on back navigation
    switch (block) {
      case 'patologies_mixed':
        dispatch(clearLPPSecondaryAnswer({ id: 'patologies_mixed' }));
        break;
      case 'patologies_holestatic':
        dispatch(clearLPPSecondaryAnswer({ id: 'patologies_holestatic' }));
        break;
    }

    if (block === 'lpp_type') {
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
      case 'lpp_type':
        return (
          <QuestionsBlock
            title="Интерпретация обследований"
            questions={lppSecondaryAnswers.filter((el) => el.id === 'lpp_type')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) => {
              dispatch(
                setLPPSecondaryAnswer({
                  id: id,
                  answer: val,
                })
              );
            }}
          />
        );
      case 'patologies_mixed':
        return (
          <QuestionsBlock
            title="Интерпретация обследований"
            questions={lppSecondaryAnswers.filter(
              (el) => el.id === 'patologies_mixed'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setLPPSecondaryAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'patologies_holestatic':
        return (
          <QuestionsBlock
            title="Интерпретация обследований"
            questions={lppSecondaryAnswers.filter(
              (el) => el.id === 'patologies_holestatic'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setLPPSecondaryAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
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

export { LPPSecondary };
