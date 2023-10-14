import { useAppSelector } from '../../../app/hooks';
import { selectQuestions } from '../../../features/questions/questionsSlice';
import { Recommendations } from '../../Recommendations/Recommendations';
import { DiagnosisProbability } from '../DiagnosisProbability/DiagnosisProbability';

import './DiagnosisBlock.scss';
import { Link } from 'react-router-dom';
import { RecommendedExaminations } from './components/RecommendedExaminations';
import { EmpyricalTherapy } from './components/EmpyricalTherapy';

interface Props {
  onBack: () => void;
}

const DiagnosisBlock = ({ onBack }: Props) => {
  const questions = useAppSelector(selectQuestions);

  const questionsPoints = () => {
    return questions.reduce((acc, question) => {
      if (!question.value) return acc;

      // TS shenanigans
      return (
        acc +
        (typeof question.value.value === 'string'
          ? parseInt(question.value.value, 10)
          : question.value.value)
      );
    }, 0);
  };

  const probablity = () => {
    if (questionsPoints() > 3 && questionsPoints() < 8) {
      return 50;
    }
    if (questionsPoints() >= 8 && questionsPoints() <= 10) {
      return 79;
    }
    if (questionsPoints() >= 11) {
      return 89;
    }

    return 0;
  };

  if (questionsPoints() <= 3) {
    return (
      <div className="quiz-block">
        <button className="quiz-block__back" onClick={onBack}>
          Назад
        </button>

        <div className="quiz-block__title">Результаты диагностики</div>

        <Recommendations
          list={[
            '<span>Диагноз ГЭРБ маловероятен.</span><br>Рекомендовано продолжить диагностический поиск в других нозологиях',
          ]}
        />

        <div className="quiz-block__foot quiz-block__foot--end">
          <Link to="/" className="quiz-block__btn">
            Закончить прием
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-block">
      <div className="quiz-block__wrap quiz-block__wrap--columns">
        <div className="quiz-block__column">
          <button className="quiz-block__back" onClick={onBack}>
            Назад
          </button>

          <div className="quiz-block__head">
            <div className="quiz-block__title">Предварительный диагноз</div>
            <DiagnosisProbability percent={probablity()} />
          </div>

          <RecommendedExaminations points={questionsPoints()} />
        </div>

        <div className="quiz-block__column">
          <EmpyricalTherapy points={questionsPoints()} />

          <div className="quiz-block__foot quiz-block__foot--end">
            <Link to="/" className="quiz-block__btn quiz-block__btn--light">
              Закончить прием
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DiagnosisBlock };
