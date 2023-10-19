import { useState } from 'react';
import { SourcesList } from '../../components/SourcesList/SourcesList';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { RecommendationsBlock } from '../../components/quiz/RecommendationsBlock/RecommendationsBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSelectedSymptoms } from '../../store/symptomsSlice';
import { useNavigate } from 'react-router-dom';

import { ExaminationsBlock } from '../../components/quiz/ExaminationsBlock/ExaminationsBlock';
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock/QuestionsBlock';
import {
  addSelectedExaminationAnswer,
  selectSelectedExaminations,
} from '../../store/examinationsSlice';
import { getAnswer, getQuestions, hasExamination } from '../../app/helpers';
import { phImpedance } from '../../data/examinationsData';
import { CalcIndexSymptom } from '../../components/quiz/CalcIndexSymptom';
import { store } from '../../app/store';
import { Examination, Option } from '../../types/interfaces';
import { NoEgds } from '../../components/quiz/DiagnosisBlock/components/secondary/NoEgds';

const totalSteps = 3;

const Secondary = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('examinations');
  const [prevBlock, setPrevBlock] = useState<string[]>([]);

  // ??
  useAppSelector(selectSelectedExaminations);

  const navigate = useNavigate();

  const stepTitle = () => {
    switch (step) {
      case 1:
        return 'Шаг 1: Уточняющие вопросы';
      case 2:
        return 'Шаг 2: Уточняющие вопросы';
      case 3:
        return 'Шаг 2: Определение диагноза и составление плана терапии';
    }
  };

  const [continueWithoutEgds, SetContinueWithoutEgds] = useState<
    Examination['questions']
  >([
    {
      title: 'Хотите оценить результаты проведенных исследований?',
      type: 'radio',
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

  const progress = () => {
    return `${Math.round((step / totalSteps) * 100)}%`;
  };

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
    setPrevBlock(prevBlock.concat(block));
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
        // Есть признаки повреждения слизистой - переход на доп. вопросы ЭГДС
        if (
          getAnswer(
            'ЭГДС',
            'В ходе ЭГДС выявлены признаки повреждения слизистой оболочки пищевода?'
          ) === 1
        ) {
          setBlock('egdsAdvanced');
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
        break;

      case 'phBasic':
        // <4% времени - переход на проверку индекса
        if (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Процент времени, в течение которого pH был <4'
          ) === '<4%'
        ) {
          setBlock('phIndex');
          return;
        }

        // <6% времени - переход на проверку кол-ва эпизодов рефлюкса
        if (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Процент времени, в течение которого pH был <4'
          ) === '<6%'
        ) {
          setBlock('phRefluxEpisodes');
          return;
        }

        // >6% времени - переход на диагноз
        if (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Процент времени, в течение которого pH был <4'
          ) === '>6%'
        ) {
          setStep(3);
          setBlock('diagnosis');
          return;
        }
        break;

      // Индекс симптома
      case 'phIndex':
        // Индекс > 50 - переход на диагноз
        if (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Индекс симптома (ИС) > 50%?'
          ) === 1
        ) {
          setStep(3);
          setBlock('diagnosis');
          return;
        }

        // Индекс < 50 - переход на диагноз
        if (
          getAnswer(
            'Суточная pH-импедансометрия',
            'Индекс симптома (ИС) > 50%?'
          ) === 0
        ) {
          setBlock('diagnosis');
          setStep(3);
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
        if (
          getAnswer(
            'Манометрия высокого разрешения',
            'Значение суммарного давления расслабления (IRP)'
          ) === '>15'
        ) {
          setBlock('manometryPeristalic');
          return;
        }

        if (
          getAnswer(
            'Манометрия высокого разрешения',
            'Значение суммарного давления расслабления (IRP)'
          ) === '<15'
        ) {
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
    if (block === 'examinations') {
      navigate('/');
      return;
    }

    if (prevBlock.length > 0) {
      setBlock(prevBlock[prevBlock.length - 1]);
      setPrevBlock(prevBlock.slice(0, -1));
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
            questions={getQuestions('ЭГДС').slice(0, 1)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'ЭГДС',
                  questionTitle: questionTitle,
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
            questions={getQuestions('ЭГДС').slice(1, 4)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'ЭГДС',
                  questionTitle: questionTitle,
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
            questions={getQuestions('ЭГДС').slice(5, 8)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'ЭГДС',
                  questionTitle: questionTitle,
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
            questions={getQuestions('Суточная pH-импедансометрия').slice(0, 1)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Суточная pH-импедансометрия',
                  questionTitle: questionTitle,
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
            questions={getQuestions('Суточная pH-импедансометрия').slice(1, 2)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Суточная pH-импедансометрия',
                  questionTitle: questionTitle,
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
            questions={getQuestions('Суточная pH-импедансометрия').slice(2, 3)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Суточная pH-импедансометрия',
                  questionTitle: questionTitle,
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
                if (index === 0) {
                  return {
                    ...item,
                    value: val,
                  };
                }
                return item;
              });

              SetContinueWithoutEgds(newAnswer);
            }}
          />
        );
      case 'rentgenBasic':
        return (
          <QuestionsBlock
            title="Рентгеноскопия пищевода и желудка с сульфатом бария"
            questions={getQuestions(
              'Рентгеноскопия пищевода и желудка с сульфатом бария'
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle:
                    'Рентгеноскопия пищевода и желудка с сульфатом бария',
                  questionTitle: questionTitle,
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
            questions={getQuestions('Манометрия высокого разрешения').slice(
              0,
              1
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Манометрия высокого разрешения',
                  questionTitle: questionTitle,
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
            questions={getQuestions('Манометрия высокого разрешения').slice(
              1,
              2
            )}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Манометрия высокого разрешения',
                  questionTitle: questionTitle,
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
            questions={getQuestions('Манометрия высокого разрешения').slice(2)}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, questionTitle) =>
              dispatch(
                addSelectedExaminationAnswer({
                  examinationTitle: 'Манометрия высокого разрешения',
                  questionTitle: questionTitle,
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

export { Secondary };
