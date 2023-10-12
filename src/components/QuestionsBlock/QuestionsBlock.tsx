import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectQuestions } from '../../features/questions/questionsSlice';
import { setAnswer } from '../../features/questions/questionsSlice';

interface Props {
  onNext: () => void;
}

const QuestionsBlock = ({ onNext }: Props) => {
  const questions = useAppSelector(selectQuestions);

  const dispatch = useAppDispatch();

  // const handleSymptomSelect = (item: Option) => {
  //     const dbItem = questions.find((symptom) => symptom.title === item.value);

  //     if (!dbItem) return;

  //     dispatch(addSelected(dbItem));
  // };

  return (
    <div className="quiz-block">
      <button className="quiz-block__back">Назад</button>

      <div className="quiz-block__head">
        <div className="quiz-block__title">ТЕСТ GERD Q</div>
      </div>

      <div className="quiz-block__text">За последнюю неделю:</div>

      <div className="quiz-block__wrap quiz-block__wrap--columns">
        <div className="quiz-block__column">
          {questions.slice(0, Math.floor(questions.length / 2)).map((el) => (
            <div className="quiz-block__questions-item questions-item">
              <div className="question-item__title">{el.title}</div>
              <div className="question-item__options">
                {el.options.map((option) => (
                  <button className="question-item__btn">{option}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-block__column">
          {questions.slice( Math.floor(questions.length / 2)).map((el) => (
            <div className="quiz-block__questions-item questions-item">
              <div className="question-item__title">{el.title}</div>
              <div className="question-item__options">
                {el.options.map((option) => (
                  <button className="question-item__btn">{option}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-block__column">
          {/* <div className="quiz-block__foot">
                        {Boolean(selectedSymptoms.length) && (
                            <button className="quiz-block__btn" onClick={onNext}>
                                Продолжить
                            </button>
                        )}
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export { QuestionsBlock };
