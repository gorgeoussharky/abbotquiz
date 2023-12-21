import {
  useAppSelector,
  useAppDispatch,
} from '../../app/hooks';
import { removeSelectedExamination, selectExaminations, selectSelectedExaminations, addSelectedExamination } from '../../store/herb/examinationsSlice';
import { Checkbox } from '../form/Checkbox';
import { Examination } from '../../types/interfaces';
import styled from 'styled-components';
import { BackLink, Button, Foot, Heading, QuizWrap, Subheading } from '../elements';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const CheckboxList = styled.div`
  display: grid;
  gap: 12px;
`

const ExaminationsBlock = ({ onNext, onBack }: Props) => {
  const examinations = useAppSelector(selectExaminations);
  const selectedExaminations = useAppSelector(selectSelectedExaminations);

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
    <QuizWrap>
      <BackLink onClick={onBack}>
        Назад
      </BackLink>

        <Heading>Обследование</Heading>

      <Subheading>
          Какие исследования были проведены пациенту?
        </Subheading>

      <CheckboxList>
        {examinations.map((examination) => (    
            <Checkbox
            key={examination.title}
            label={examination.title}
            value={examination.title}
            checked={selectedExaminations.some((el) => el.title === examination.title)}
            onChange={() => handleSelectExamination(examination)}
          />
  
        ))}
      </CheckboxList>

      <Foot $align='flex-end'>
        {Boolean(isBtnActive()) && (
          <Button  onClick={onNext}>
            Продолжить
          </Button>
        )}
      </Foot>
    </QuizWrap>
  );
};

export { ExaminationsBlock };
