import { useAppSelector } from '../../../../app/hooks';
import { selectGerdQQuestions } from '../../../../store/herb/gerdQQuestionsSlice';
import { selectControlQuestions } from '../../../../store/herb/controlAppointmentSlice';
import { useEffect, useState } from 'react';
import { TherapyEffective } from './control/TherapyEffective';
import { TherapyCorrection } from './control/TherapyCorrection';
import { RefractoryFlow } from './control/RefractoryFlow';
import { ShortLength } from './control/ShortLength';

interface Props {
  onBack: () => void;
}

const ControlDiagnosis = ({ onBack }: Props) => {
  const questions = useAppSelector(selectGerdQQuestions);
  const controlQuestions = useAppSelector(selectControlQuestions);

  const [diagnosis, setDiagnosis] = useState('');

  const hasEgdsResults = controlQuestions.find((el) => el.title === 'Есть ли у пациента результаты контрольного исследования ЭГДС?')?.value?.value;
  const hasImprovement = controlQuestions.find((el) => el.title === 'Выраженное улучшение состояния на повторной ЭГДС')?.value?.value;
  const hasShortLength = controlQuestions.find((el) => el.title === 'Длительность ранее проведенной терапии составляла менее 8-ми недель?')?.value?.value;

  const questionsPoints = () => {
    return questions.reduce((acc, question) => {
      if (!question.value) return acc;

      if (typeof question.value.value === 'boolean') return acc;

      if (typeof question.value.value === 'string')
        return acc + parseInt(question.value.value, 10);

      return acc + question.value.value;
    }, 0);
  };

  useEffect(() => {
    // Нет результатов ЭГДС
    if (!hasEgdsResults) {
      if (questionsPoints() <= 3) {
        setDiagnosis('therapyEffective');
        return;
      }

      if (questionsPoints() > 3 && questionsPoints() < 8) {
        setDiagnosis('therapyCorrection');
        return;
      }

      if (questionsPoints() >= 8) {
        if (hasShortLength) {
          setDiagnosis('shortLength');
          return;
        }

        setDiagnosis('refractoryFlow');
        return;
      }
    }

    // Есть результаты ЭГДС

    if (hasEgdsResults) {
      // Нет улучшения
      if (!hasImprovement) {
        if (hasShortLength) {
          setDiagnosis('shortLength');
          return;
        }

        setDiagnosis('refractoryFlow');
        return;
      }

      // Есть улучшения
      if (hasImprovement) {
        if (questionsPoints() <= 3) {
          setDiagnosis('therapyEffective');
          return;
        }

        if (questionsPoints() > 3 && questionsPoints() < 8) {
          setDiagnosis('therapyCorrection');
          return;
        }

        if (questionsPoints() >= 8) {
          if (hasShortLength) {
            setDiagnosis('shortLength');
            return;
          }

          setDiagnosis('refractoryFlow');
          return;
        }
      }
    }
  }, []);

  switch (diagnosis) {
    case 'therapyEffective':
      return <TherapyEffective onBack={onBack} />;
    case 'therapyCorrection':
      return <TherapyCorrection onBack={onBack} />;
    case 'refractoryFlow':
      return <RefractoryFlow onBack={onBack} />;
    case 'shortLength':
      return <ShortLength onBack={onBack} />;
    default:
      return <></>;
  }
};

export { ControlDiagnosis };
