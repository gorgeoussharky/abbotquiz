import { useAppSelector } from '../../../../app/hooks';
import { selectGerdQQuestions } from '../../../../store/gerdQQuestionsSlice';
import { LowProb } from './first/LowProb';
import { HighProb } from './first/HighProb';

interface Props {
  onBack: () => void;
}

const FirstDiagnosis = ({ onBack }: Props) => {
  const questions = useAppSelector(selectGerdQQuestions);

  const questionsPoints = () => {
    return questions.reduce((acc, question) => {
      if (!question.value) return acc;

      if (typeof question.value.value === 'boolean') return acc

      if (typeof question.value.value === 'string') return acc + parseInt(question.value.value, 10)
      
      return acc + question.value.value;
    }, 0);
  };


  if (questionsPoints() <= 3) {
    return <LowProb onBack={onBack} />
  }

  return <HighProb points={questionsPoints()} onBack={onBack} /> 
};

export { FirstDiagnosis };
