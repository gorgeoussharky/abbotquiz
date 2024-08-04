import { useEffect, useState } from 'react';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import {
  addBlockHistory,
  removeLastBlockHistoryElement,
  selectPrevBlocksHistory,
} from '../../store/utilsSlice';
import {
  resetSrkControlAnswerByID,
  selectSrkControlQuestions,
  setSrkControlAnswer,
} from '../../store/srk/controlAppointmentSlice';

const totalSteps = 3;

const SrkControl = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('therapy_control');
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const srkControlQuestions = useAppSelector(selectSrkControlQuestions);

  const checkAnswer = (id: string, answer: string | number) => {
    const question = srkControlQuestions.find((el) => el.id === id);

    if (!question) return;

    return question.value?.value === answer;
  };

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
        return 'Шаг 2: Уточняющие вопросы';
      case 3:
        return 'Шаг 3: Результаты контрольного приема';
      default:
        return '';
    }
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      case 'therapy_control':
        if (checkAnswer('therapy_length', 0)) {
          setStep(3);
          setBlock('diagnosis');
          break;
        }

        setStep(2);
        setBlock('therapy_improvement');
        break;

      case 'therapy_improvement':
        if (checkAnswer('has_improvments', 'Не улучшилось')) {
          setBlock('srk_type');
          break;
        }

        setBlock('diagnosis');
        setStep(3);
        return;

      case 'srk_type':
        setBlock('diagnosis');
        setStep(3);
        return;
    }
  };

  const handleBack = () => {
    // Clearing results on back navigation
    switch (block) {
      case 'therapy_control':
        dispatch(resetSrkControlAnswerByID({ id: 'therapy_length' }));
        break;
      case 'therapy_improvement':
        dispatch(resetSrkControlAnswerByID({ id: 'has_improvments' }));
        break;
      case 'srk_type':
        dispatch(resetSrkControlAnswerByID({ id: 'srk_type' }));
        break;
    }

    if (block === 'therapy_control') {
      navigate('/srk');
      return;
    }

    if (blockHistory.length > 0) {
      setBlock(blockHistory[blockHistory.length - 1]);
      dispatch(removeLastBlockHistoryElement());
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'therapy_control':
        return (
          <QuestionsBlock
            title="Контроль терапии"
            questions={srkControlQuestions.filter(
              (el) => el.group === 'therapy_control'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setSrkControlAnswer({
                  id: id,
                  option: val,
                })
              )
            }
          />
        );
      case 'therapy_improvement':
        return (
          <QuestionsBlock
            title="Наблюдается ли на фоне терапии улучшение состояния пациента?"
            questions={srkControlQuestions.filter(
              (el) => el.group === 'therapy_improvement'
            )}
            onBack={handleBack}
            onNext={handleNext}
            cols={1}
            onChange={(val, id) =>
              dispatch(
                setSrkControlAnswer({
                  id: id,
                  option: val,
                })
              )
            }
          />
        );
      case 'srk_type':
        return (
          <QuestionsBlock
            title="Выберите подтип СРК и/или сохраняющиеся симптомы:"
            questions={srkControlQuestions.filter(
              (el) => el.group === 'srk_type'
            )}
            onBack={handleBack}
            onNext={handleNext}
            cols={1}
            onChange={(val, id) =>
              dispatch(
                setSrkControlAnswer({
                  id: id,
                  option: val,
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

export { SrkControl };
