import { useEffect, useMemo, useState } from 'react';
import { SourcesList } from '../../components/SourcesList';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import { Container, Notice, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import {
  addBlockHistory,
  removeLastBlockHistoryElement,
  selectHasLastDiagnosis,
  selectPrevBlocksHistory,
} from '../../store/utilsSlice';
import {
  addSelectedSrkExaminationAnswer,
  clearSrkExaminations,
  selectSrkExaminations,
} from '../../store/srk/examinationsSlice';
import { Option, QuestionEntry } from '../../types/interfaces';
import {
  diseasesList,
  notificationsList,
} from '../../components/quiz/DiagnosisBlock/srk/secondary/diseases';
import { BSFKModal } from '../../components/quiz/BSFKModal';

const totalSteps = 3;

const SrkSecondary = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('examinations');

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);
  const questions = useAppSelector(selectSrkExaminations);

  const navigate = useNavigate();

  const checkAnswer = (id: string, answer: string) => {
    const question = questions.find((el) => el.id === id);

    if (!question || !question.value) return false;

    const parsedAnswers = JSON.parse(
      question.value.value as string
    ) as Option[];

    return parsedAnswers.some((el) => el.value === answer);
  };

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
        return 'Шаг 2: Уточняющие вопросы';
      case 3:
        return 'Шаг 2: Определение диагноза и составление плана терапии';
      default:
        return '';
    }
  };

  const dispatch = useAppDispatch();

  const isNoData = useMemo(() => {
    // Не выбраны исследования
    return !questions.filter((el) => {
      if (!el.value) return false;

      try {
        return Boolean(JSON.parse(el.value?.value as string).length);
      } catch (e) {
        return Boolean(el.value.value);
      }
    }).length;
  }, [questions]);

  const diseases = useMemo(diseasesList, [questions]);
  const notifications = useMemo(notificationsList, [questions]);

  const handleFamiliarize = () => {
    // clear data
    dispatch(clearSrkExaminations())

    setBlock('bsfk')
  }

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      // Список обследований
      case 'examinations':
        // Не выбраны исследования
        if (isNoData) {
          setBlock('diagnosis');
          setStep(3);
          break;
        }

        setBlock('analysis');
        setStep(2);
        break;

      case 'analysis':
        if (
          checkAnswer(
            'feces_analysis',
            'Панкреатическая эластаза кала понижена'
          )
        ) {
          setBlock('feces_consistency');
          break;
        }

        // Была проведена илеоколоноскопия
        if (
          checkAnswer(
            'instrumental_researches',
            'Илеоколоноскопия с биопсией из толстого и тонкого кишечника'
          )
        ) {
          // Выявлены признаки повреждения кишечника
          if (
            checkAnswer(
              'instrumental_analysis',
              'В ходе колоноскопии выявлены признаки повреждения кишечника'
            )
          ) {
            setBlock('damages');
            break;
          } else {
            setBlock('colitis');
            break;
          }
        }

        // Нет отклонений
        if (!diseases.length && !notifications.length) {
          setBlock('bsfk');
          break;
        }

        setBlock('diagnosis');
        setStep(3);
        break;

      default:
        setBlock('diagnosis');
        setStep(3);
        break;
    }
  };

  const handleBack = () => {
    if (block === 'examinations') {
      navigate('/');
      //dispatch(clearSelectedExaminations());
      return;
    }

    if (blockHistory.length > 0) {
      if (blockHistory[blockHistory.length - 1] === 'diagnosis') {
        setBlock(blockHistory[blockHistory.length - 2]);
        dispatch(removeLastBlockHistoryElement());
        return
      }

      setBlock(blockHistory[blockHistory.length - 1]);
      dispatch(removeLastBlockHistoryElement());
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'examinations':
        return (
          <>
            <QuestionsBlock
              title="Отметьте, какие из нижеперечисленных исследований были проведены пациенту:"
              questions={questions.filter((el) => el.group === 'examinations')}
              onBack={handleBack}
              onNext={handleNext}
              onChange={(val, id) =>
                dispatch(
                  addSelectedSrkExaminationAnswer({
                    id: id,
                    answer: val,
                  })
                )
              }
            />
            <Notice style={{marginTop: 24}}>
              <div>*актуально только для пациентов с диареей</div>
              <div>
                ** чаще применяется водородный дыхательный тест с лактулозой
              </div>
            </Notice>
          </>
        );
      case 'analysis':
        const analysisQuestions = () => {
          let list: QuestionEntry[] = structuredClone(
            questions.filter((el) => el.group === 'analysis')
          );

          list.forEach((el) => {
            // Убираем варианты анализа, если не выбрано исследования по зависимостям
            el.options = el.options?.filter((option) =>
              option.dependency
                ? checkAnswer(option.dependency.id, option.dependency.value)
                : true
            );
          });

          // Если вариантов нет - убираем группу
          list = list.filter((el) => el.options?.length);

          return list;
        };

        return (
          <>
            <QuestionsBlock
              title="Интерпретация проведенных исследований:"
              questions={analysisQuestions()}
              cols={2}
              onBack={handleBack}
              onNext={handleNext}
              onChange={(val, id) =>
                dispatch(
                  addSelectedSrkExaminationAnswer({
                    id: id,
                    answer: val,
                  })
                )
              }
            />
            <Notice style={{marginTop: 24}}>
              <div>*актуально только для пациентов с диареей</div>
              <div>
                ** чаще применяется водородный дыхательный тест с лактулозой
              </div>
            </Notice>
          </>
        );
      case 'damages':
        return (
          <>
            <QuestionsBlock
              title="Признаки повреждения кишечника"
              questions={questions.filter(
                (el) => el.group === 'intestine_damage'
              )}
              onBack={handleBack}
              onNext={handleNext}
              onChange={(val, id) =>
                dispatch(
                  addSelectedSrkExaminationAnswer({
                    id: id,
                    answer: val,
                  })
                )
              }
            />
          </>
        );
      case 'colitis':
        return (
          <>
            <QuestionsBlock
              title="Выявлены ли отклонения от нормы в ходе гистологического исследования толстой кишки при нормальной картине колоноскопии?"
              questions={questions.filter((el) => el.group === 'colitis')}
              onBack={handleBack}
              onNext={handleNext}
              onChange={(val, id) =>
                dispatch(
                  addSelectedSrkExaminationAnswer({
                    id: id,
                    answer: val,
                  })
                )
              }
            />
          </>
        );
      case 'feces_consistency':
        return (
          <>
            <QuestionsBlock
              title="Понижена панкреатическая эластаза кала"
              questions={questions.filter(
                (el) => el.group === 'feces_consistency'
              )}
              onBack={handleBack}
              onNext={handleNext}
              onChange={(val, id) =>
                dispatch(
                  addSelectedSrkExaminationAnswer({
                    id: id,
                    answer: val,
                  })
                )
              }
            />
          </>
        );
      case 'bsfk':
        return (
          <>
            <QuestionsBlock
              title="Оценка стула с помощью Бристольской шкалы формы кала (БШФК)"
              questions={questions.filter((el) => el.group === 'bsfk')}
              onBack={handleBack}
              onNext={handleNext}
              onChange={(val, id) =>
                dispatch(
                  addSelectedSrkExaminationAnswer({
                    id: id,
                    answer: val,
                  })
                )
              }
            />
            <BSFKModal />
          </>
        );
      case 'diagnosis':
        return <DiagnosisBlock onFamiliarize={handleFamiliarize} onBack={handleBack} />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <QuizCard className="quiz__card">
        <ProgressBar step={step} totalSteps={totalSteps} title={stepTitle()} />
        <QuizBlock />
      </QuizCard>

      <SourcesList />
    </Container>
  );
};

export { SrkSecondary };
