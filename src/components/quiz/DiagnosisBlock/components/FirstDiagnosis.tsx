import { useAppSelector } from '../../../../app/hooks';
import { selectQuestions } from '../../../../store/questionsSlice';
import { LowProb } from './first/LowProb';
import { HighProb } from './first/HighProb';

interface Props {
  onBack: () => void;
}

const FirstDiagnosis = ({ onBack }: Props) => {
  const questions = useAppSelector(selectQuestions);

  const questionsPoints = () => {
    return questions.reduce((acc, question) => {
      if (!question.value) return acc;

      if (typeof question.value.value === 'boolean') return acc
      // TS shenanigans
      return (
        acc +
        (typeof question.value.value === 'string'
          ? parseInt(question.value.value, 10)
          : question.value.value)
      );
    }, 0);
  };


  if (questionsPoints() <= 3) {
    return <LowProb onBack={onBack} />
  }

  return <HighProb points={questionsPoints()} onBack={onBack} /> 
};

export { FirstDiagnosis };
