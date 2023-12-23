import { useAppSelector } from '../../../../app/hooks';
import { selectSrkControlQuestions } from '../../../../store/srk/controlAppointmentSlice';
import { Continue } from './control/Continue';
import { Correction } from './control/Correction';
import { Remission } from './control/Remission';
import { ShortLength } from './control/ShortLength';

interface Props {
  onBack: () => void;
}

const ControlSrkDiagnosis = ({ onBack }: Props) => {
  const srkControlQuestions = useAppSelector(selectSrkControlQuestions);

  const checkAnswer = (id: string, answer: string | number) => {
    const question = srkControlQuestions.find((el) => el.id === id);

    if (!question) return;

    return question.value?.value === answer;
  };

  if (checkAnswer('therapy_length', 0)) {
    return <ShortLength onBack={onBack} />;
  }

  switch (
    srkControlQuestions.find((el) => el.id === 'has_improvments')?.value?.value
  ) {
    case 'Улучшилось':
      return <Remission onBack={onBack} />;
    case 'Частично улучшилось':
      return <Continue onBack={onBack} />;
    case 'Не улучшилось':
      return <Correction onBack={onBack} />;
  }

  return <></>
};

export { ControlSrkDiagnosis };
