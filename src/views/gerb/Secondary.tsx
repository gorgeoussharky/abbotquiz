import { useEffect, useState } from 'react';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { RecommendationsBlock } from '../../components/quiz/RecommendationsBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

import { ExaminationsBlock } from '../../components/quiz/ExaminationsBlock';
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import {
  addSelectedExaminationAnswer,
  clearSelectedExaminations,
  removeSelectedExaminationAnswerByID,
  selectSelectedExaminations,
} from '../../store/herb/examinationsSlice';
import { getAnswer, getHerbQuestions, hasExamination } from '../../app/helpers';
import { CalcIndexSymptom } from '../../components/quiz/CalcIndexSymptom';
import { Examination } from '../../types/interfaces';
import { Container, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import {
  addBlockHistory,
  removeLastBlockHistoryElement,
  selectHasLastDiagnosis,
  selectPrevBlocksHistory,
} from '../../store/utilsSlice';
import { NoEgds } from '../../components/quiz/DiagnosisBlock/herb/secondary/NoEgds';

const totalSteps = 3;

const Secondary = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('examinations');

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  // ??
  useAppSelector(selectSelectedExaminations);

  const navigate = useNavigate();

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

  const [continueWithoutEgds, SetContinueWithoutEgds] = useState<
    Examination['questions']
  >([
    {
      title: 'Хотите оценить результаты проведенных исследований?',
      type: 'radio',
      id: 'check_previous',
      group: 'check_previous',
      options: [
        {
          label: 'Да',
          value: 1,
        },
        {
          label: 'Нет',
          value: 0,
        },
      ],
    },
  ]);

  const dispatch = useAppDispatch();

  // Базовые проверки и навигация между блоками
  const basicNav = () => {
    // Выбрана pH-импедансометрия - перейти на базовые вопросы ph
    if (hasExamination('Суточная pH-импедансометрия')) {
      setBlock('phBasic');
      setStep(2);
      return;
    }

    if (hasExamination('Рентгеноскопия пищевода и желудка с сульфатом бария')) {
      setBlock('rentgenBasic');
      setStep(2);
      return;
    }

    if (hasExamination('Манометрия высокого разрешения')) {
      setBlock('manometryBasic');
      setStep(2);
      return;
    }
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      // Список обследований
      case 'examinations':
        // НЕ выбран ЭГДС - показать предупреждение
        if (!hasExamination('ЭГДС')) {
          setBlock('egdsWarning');
          setStep(2);
          return;
        }

        // Выбран ЭГДС - перейти на базовые вопросы ЭГДС
        if (hasExamination('ЭГДС')) {
          setBlock('egdsBasic');
          setStep(2);
          return;
        }

        basicNav();
        break;

      case 'egdsWarning':
        // Продолжить анализ без ЭГДС?

        // Нет - переход на диагноз (заглушка)
        if (continueWithoutEgds![0].value?.value === 0) {
          setBlock('noEgdsStop');
          return;
        }

        // Да - переход на анализ в зависимости от выбранных обследования
        if (continueWithoutEgds![0].value?.value === 1) {
          // Проверка на другие обследования
          basicNav();
          return;
        }

        break;

      // Базовый ЭГДС
      case 'egdsBasic':
        switch (
          getAnswer(
            'ЭГДС',
            'В ходе ЭГДС выявлены признаки повреждения слизистой оболочки пищевода?'
          )
        ) {
          // Есть признаки повреждения слизистой - переход на доп. вопросы ЭГДС
          case 1:
            setBlock('egdsAdvanced');
            return;
          // Нет признаков повреждения слизистой
          case 0:
            // Нет признаков и была проведена ph-импедансометрия
            if (hasExamination('Суточная pH-импедансометрия')) {
              setBlock('phBasic');
              return;
            }

            // Не была проведена импедансометрия, но была проведена манометрия
            if (hasExamination('Манометрия высокого разрешения')) {
              setBlock('manometryBasic');
              return;
            }

            // Не была проведена импедансометрия, не была проведена манометрия, была проведена рентгеноскопия
            if (hasExamination('Манометрия высокого разрешения')) {
              setBlock('rentgenBasic');
              return;
            }

            // Нет признаков и нет ph-импедансометрии
            setBlock('diagnosis');
            return;
        }

        // Проверка на другие обследования
        basicNav();

        // Не было отмечено ничего, кроме ЭГДС и нет признаков повреждения слизистой - переход на диагноз
        setBlock('diagnosis');
        setStep(3);
        break;

      case 'egdsAdvanced':
        // Обнаружены признаки пищевода Баррета - переход на доп. вопросы
        if (getAnswer('ЭГДС', 'Обнаружены признаки пищевода Барретта?') === 0) {
          setBlock('egdsSuperAdvanced');
          return;
        }

        // Проверка на другие обследования
        basicNav();

        // Не было отмечено ничего, кроме ЭГДС и нет признаков повреждения слизистой - переход на диагноз
        setBlock('diagnosis');
        setStep(3);
        break;
      case 'egdsSuperAdvanced':
        // Переход на диагноз в любом случае
        setBlock('diagnosis');
        setStep(3);

        if (window.ym) {
          window.ym(90602537, 'reachGoal', 'cdss_end2');
        }
        break;

      case 'phBasic':
        switch (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Процент времени, в течение которого pH был <4'
          )
        ) {
          // <4% времени - переход на проверку индекса симптома
          case '<4%':
            setBlock('phIndex');
            return;
          // <6% времени - переход на проверку кол-ва эпизодов рефлюкса
          case '<6%':
            setBlock('phRefluxEpisodes');
            return;
          // >6% времени - переход на диагноз
          case '>6%':
            setBlock('diagnosis');
            setStep(3);
            return;
        }

        break;

      // Индекс симптома
      case 'phIndex':
        switch (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Индекс симптома (ИС) > 50%?'
          )
        ) {
          // Индекс > 50 - переход на диагноз
          case 1:
            setStep(3);
            setBlock('diagnosis');
            return;
          // Индекс < 50
          case 0:
            // Индекс < 50 и была проведена манометрия - вопросы по манометрии
            if (hasExamination('Манометрия высокого разрешения')) {
              setBlock('manometryBasic');
              return;
            }

            // Индекс < 50 и была проведена рентгеноскопия - вопросы по рентгеноскопии
            if (
              hasExamination(
                'Рентгеноскопия пищевода и желудка с сульфатом бария'
              )
            ) {
              // Переход на вопросы рентгеноскопии
              setBlock('rentgenBasic');
              return;
            }

            // Только ph импедансометрия
            setStep(3);
            setBlock('diagnosis');
            return;
        }
        break;

      // Эпизоды рефлюкса
      case 'phRefluxEpisodes':
        // Переход на диагноз в любом случае
        setStep(3);
        setBlock('diagnosis');
        break;

      // Базовый рентген
      case 'rentgenBasic':
        // Переход на диагноз в любом случае
        setStep(3);
        setBlock('diagnosis');
        break;

      // Базовая манометрия
      case 'manometryBasic':
        switch (
          getAnswer(
            'Манометрия высокого разрешения',
            'Значение суммарного давления расслабления (IRP)'
          )
        ) {
          case '>15':
            setBlock('manometryPeristalic');
            return;
          case '<15':
            setBlock('manometryPeristalicAdvanced');
            return;
        }

        break;

      case 'manometryPeristalic':
        // Переход на диагноз в люблм случае
        setStep(3);
        setBlock('diagnosis');
        break;

      case 'manometryPeristalicAdvanced':
        // Переход на диагноз в люблм случае
        setStep(3);
        setBlock('diagnosis');
        break;
    }
  };

  const handleBack = () => {
    // Clearing results on back navigation
    switch (block) {
      case 'examinations':
        dispatch(clearSelectedExaminations());
        break;
      case 'egdsBasic':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'has_damages',
          })
        );
        break;
      case 'egdsAdvanced':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'has_strictures',
          })
        );
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'has_adenocarcinom',
          })
        );
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'has_barret',
          })
        );
        break;
      case 'egdsSuperAdvanced':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'damage_locations',
          })
        );
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'has_hernia',
          })
        );
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'ЭГДС',
            id: 'has_nights',
          })
        );
        break;
      case 'phBasic':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'Суточная pH-импедансометрия',
            id: 'large_ph_time',
          })
        );
        break;
      case 'phIndex':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'Суточная pH-импедансометрия',
            id: 'large_is',
          })
        );
        break;
      case 'phRefluxEpisodes':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'Суточная pH-импедансометрия',
            id: 'reflux_episodes',
          })
        );
        break;
      case 'egdsWarning':
        const newAnswer = continueWithoutEgds?.map((item, index) => {
          return {
            ...item,
            value: undefined,
          };
        });
        SetContinueWithoutEgds(newAnswer);
        break;
      case 'rentgenBasic':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle:
              'Рентгеноскопия пищевода и желудка с сульфатом бария',
            id: 'rentgenoscopy',
          })
        );
        break;
      case 'manometryBasic':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'Манометрия высокого разрешения',
            id: 'irp',
          })
        );
        break;
      case 'manometryPeristalic':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'Манометрия высокого разрешения',
            id: 'has_peristalic',
          })
        );
        break;
      case 'manometryPeristalicAdvanced':
        dispatch(
          removeSelectedExaminationAnswerByID({
            examinationTitle: 'Манометрия высокого разрешения',
            id: 'peristalic_score',
          })
        );
        break;
    }

    if (block === 'examinations') {
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
      case 'examinations':
        return <ExaminationsBlock onBack={handleBack} onNext={handleNext} />;
      case 'egdsBasic':
        // Основные вопросы ЭГДС
        return (
          <QuestionsBlock
            title="ЭГДС"
            questions={getHerbQuestions('ЭГДС').filter(
              (el) => el.group === 'egdsBasic'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'ЭГДС',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'egdsAdvanced':
        // Доп вопросы ЭГДС
        return (
          <QuestionsBlock
            title="Повреждения слизистой оболочки пищевода"
            questions={getHerbQuestions('ЭГДС').filter(
              (el) => el.group === 'egdsAdvanced'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'ЭГДС',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'egdsSuperAdvanced':
        // Доп. Доп вопросы ЭГДС
        return (
          <QuestionsBlock
            title="Повреждения слизистой оболочки пищевода"
            questions={getHerbQuestions('ЭГДС').filter(
              (el) => el.group === 'egdsSuperAdvanced'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'ЭГДС',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'phBasic':
        return (
          <QuestionsBlock
            title="pH-импедансометрия"
            questions={getHerbQuestions('Суточная pH-импедансометрия').filter(
              (el) => el.group === 'phBasic'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Суточная pH-импедансометрия',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'phIndex':
        return (
          <QuestionsBlock
            title="pH-импедансометрия"
            questions={getHerbQuestions('Суточная pH-импедансометрия').filter(
              (el) => el.group === 'phIndex'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Суточная pH-импедансометрия',
                  id: id,
                  answer: val,
                })
              )
            }
          >
            <CalcIndexSymptom />
          </QuestionsBlock>
        );
      case 'phRefluxEpisodes':
        return (
          <QuestionsBlock
            title="pH-импедансометрия"
            questions={getHerbQuestions('Суточная pH-импедансометрия').filter(
              (el) => el.group === 'phRefluxEpisodes'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Суточная pH-импедансометрия',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'egdsWarning':
        return (
          <QuestionsBlock
            title="Для оценки полной клинической картины заболевания и постановки правильного диагноза пациенту рекомендуется проведение ЭГДС"
            questions={continueWithoutEgds}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val) => {
              const newAnswer = continueWithoutEgds?.map((item, index) => {
                return {
                  ...item,
                  value: val,
                };
              });

              SetContinueWithoutEgds(newAnswer);
            }}
          />
        );
      case 'rentgenBasic':
        return (
          <QuestionsBlock
            title="Рентгеноскопия пищевода и желудка с сульфатом бария"
            questions={getHerbQuestions(
              'Рентгеноскопия пищевода и желудка с сульфатом бария'
            ).filter((el) => el.group === 'rentgenBasic')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle:
                    'Рентгеноскопия пищевода и желудка с сульфатом бария',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'manometryBasic':
        return (
          <QuestionsBlock
            title="Манометрия высокого разрешения"
            questions={getHerbQuestions(
              'Манометрия высокого разрешения'
            ).filter((el) => el.group === 'manometryBasic')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Манометрия высокого разрешения',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'manometryPeristalic':
        return (
          <QuestionsBlock
            title="Манометрия высокого разрешения"
            questions={getHerbQuestions(
              'Манометрия высокого разрешения'
            ).filter((el) => el.group === 'manometryPeristalic')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Манометрия высокого разрешения',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'manometryPeristalicAdvanced':
        return (
          <QuestionsBlock
            title="Манометрия высокого разрешения"
            questions={getHerbQuestions(
              'Манометрия высокого разрешения'
            ).filter((el) => el.group === 'manometryPeristalicAdvanced')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Манометрия высокого разрешения',
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'diagnosis':
        return <DiagnosisBlock onBack={handleBack} />;
      case 'recommendations':
        return <RecommendationsBlock onBack={handleBack} />;
      case 'noEgdsStop':
        return <NoEgds onBack={handleBack} />;
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
    </Container>
  );
};

export { Secondary };
