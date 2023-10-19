import {
  useAppSelector,
  useAppDispatch,
  useIsMobile,
} from '../../../app/hooks';
import { selectQuestions } from '../../../store/questionsSlice';
import { RadioLabel } from '../../form/RadioLabel';
import { setAnswer } from '../../../store/questionsSlice';
import { Combobox } from '../../form/Combobox/Combobox';
import { Select } from '../../form/Select/Select';
import { removeSelectedExamination, selectExaminations, selectSelectedExaminations, addSelectedExamination } from '../../../store/examinationsSlice';
import { Checkbox } from '../../form/Сheckbox/Checkbox';
import { Examination } from '../../../types/interfaces';
import { json } from 'stream/consumers';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const ExaminationsBlock = ({ onNext, onBack }: Props) => {
  const examinations = useAppSelector(selectExaminations);
  const selectedExaminations = useAppSelector(selectSelectedExaminations);

  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const isBtnActive = () => {
    return selectedExaminations.length
  }

  const handleSelectExamination = (examination: Examination) => {
    const inSelected = selectedExaminations.some((el) => el.title === examination.title)
    
    if (inSelected) {
        dispatch(removeSelectedExamination(examination))
        
        return
    }

    dispatch(addSelectedExamination(examination))
  }

  return (
    <div className="quiz-block">
      <button className="quiz-block__back" onClick={onBack}>
        Назад
      </button>

      {JSON.stringify(selectExaminations)}

      <div className="quiz-block__head">
        <div className="quiz-block__title">Обследование</div>

      
      </div>

      <div className="quiz-block__subtitle">
          Какие исследования были проведены пациенту?
        </div>

      <div className="quiz-block__checkbox-list">
        {examinations.map((examination) => (    
            <Checkbox
            key={examination.title}
            label={examination.title}
            value={examination.title}
            checked={selectedExaminations.some((el) => el.title === examination.title)}
            onChange={() => handleSelectExamination(examination)}
          />
  
        ))}
      </div>

      <div className="quiz-block__foot quiz-block__foot--end">
        {isBtnActive() && (
          <button className="quiz-block__btn" onClick={onNext}>
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
};

export { ExaminationsBlock };
