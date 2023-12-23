import { useEffect, useState } from 'react';
import { SourcesList } from '../../components/SourcesList';
import { GerdQ } from '../../components/quiz/GerdQ';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import {
  selectControlQuestions,
  setControlAnswer,
} from '../../store/herb/controlAppointmentSlice';
import { selectGerdQQuestions } from '../../store/herb/gerdQQuestionsSlice';
import { addBlockHistory, removeLastBlockHistoryElement, selectPrevBlocksHistory } from '../../store/utilsSlice';

const totalSteps = 3;

const Control = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('egds');
  const blockHistory = useAppSelector(selectPrevBlocksHistory)

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const controlQuestions = useAppSelector(selectControlQuestions);
  const gerdQQuestions = useAppSelector(selectGerdQQuestions)

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [block])

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

  const questionsPoints = () => {
    return gerdQQuestions.reduce((acc, question) => {
      if (!question.value) return acc;

      if (typeof question.value.value === 'boolean') return acc

      if (typeof question.value.value === 'string') return acc + parseInt(question.value.value, 10)

      return acc + question.value.value;
    }, 0);
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    const hasEgdsResults = controlQuestions.find((el) => el.title === 'Есть ли у пациента результаты контрольного исследования ЭГДС?')?.value?.value;

    const hasImprovement = controlQuestions.find((el) => el.title === 'Выраженное улучшение состояния на повторной ЭГДС')?.value?.value;

    switch (block) {
      case 'egds':
        // Есть ЭГДС
        if (hasEgdsResults) {
          setStep(2)
          setBlock('therapyImprovement')
          return
        };

        // Без ЭГДС
        setStep(2)
        setBlock('gerdQ')
        return

      case 'therapyImprovement':
        // Есть выраженное улучшение
        if (hasImprovement) {
          setBlock('gerdQ')
          return
        };

        // Нет улучшения
        setBlock('therapyLength')
        return

      case 'therapyLength':
        setStep(3)
        setBlock('diagnosis')
        return

      case 'gerdQ':
        if (questionsPoints() > 6) {
          setBlock('therapyLength')
          return
        };

        setStep(3)
        setBlock('diagnosis')
        return
    }
  }

  const handleBack = () => {
    if (block === 'egds') {
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
      case 'egds':
        return (
          <QuestionsBlock
            title="ЭГДС"
            questions={controlQuestions.filter(el => el.group === 'egds')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setControlAnswer({
                  id: id,
                  option: val,
                })
              )
            }
          />
        );
      case 'therapyImprovement':
        return (
          <QuestionsBlock
            title="Контроль терапии"
            questions={controlQuestions.filter(el => el.group === 'therapyImprovement')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setControlAnswer({
                  id: id,
                  option: val,
                })
              )
            }
          />
        );
      case 'therapyLength':
        return (
          <QuestionsBlock
            title="Контроль терапии"
            questions={controlQuestions.filter(el => el.group === 'therapyLength')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setControlAnswer({
                  id: id,
                  option: val,
                })
              )
            }
          />
        );
      case 'gerdQ':
        return <GerdQ onBack={handleBack} onNext={handleNext} />;
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

export { Control };
