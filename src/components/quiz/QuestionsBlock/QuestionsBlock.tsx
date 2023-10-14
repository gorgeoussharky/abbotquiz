import { useAppSelector, useAppDispatch, useIsMobile } from '../../../app/hooks';
import { selectQuestions } from '../../../features/questions/questionsSlice';
import { RadioLabel } from '../../form/RadioLabel/RadioLabel';
import { setAnswer } from '../../../features/questions/questionsSlice';
import './QuestionsBlock.scss';
import { Combobox } from '../../form/Combobox/Combobox';
import { Select } from '../../form/Select/Select';

interface Props {
  onNext: () => void
  onBack: () => void
}

const QuestionsBlock = ({ onNext, onBack }: Props) => {
  const questions = useAppSelector(selectQuestions);

  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const questionsNumbered = () => {
    return questions.map((question, key) => {
      return {
        ...question,
        number: key + 1,
      };
    });
  };

  const isBtnActive = () => {
    return !questions.some((el) => !el.value);
  };

  return (
    <div className="quiz-block">
      <button className="quiz-block__back" onClick={onBack}>Назад</button>

      <div className="quiz-block__head">
        <div className="quiz-block__title">ТЕСТ GERD Q</div>
      </div>

      <div className="quiz-block__text">За последнюю неделю:</div>

      <div className="quiz-block__wrap quiz-block__wrap--columns">
        <div className="quiz-block__column">
          <div className="quiz-block__questions-block questions-block">
            <div className="questions-block__list">
              {questionsNumbered()
                .slice(0, Math.floor(questions.length / 2))
                .map((el) => (
                  <div className="quiz-block__questions-item questions-item">
                    <div className="question-item__title">
                      <span>{el.number}.</span> {el.title}
                    </div>
                    {!isMobile ? (
                      <div className="question-item__list">
                        {el.options.map((option) => (
                          <RadioLabel
                            key={el.title + option}
                            name={el.title}
                            value={option.value}
                            label={option.label}
                            checked={el.value?.value === option.value}
                            onChange={() =>
                              dispatch(setAnswer({ title: el.title, option }))
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <Select
                      label='Выберите ответ'
                      onSelect={(option) => dispatch(setAnswer({ title: el.title, option }))}
                      value={el.value?.label || ''}
                      options={el.options}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="quiz-block__column">
          <div className="quiz-block__questions-block questions-block">
            <div className="questions-block__list">
              {questionsNumbered()
                .slice(Math.floor(questions.length / 2))
                .map((el) => (
                  <div className="quiz-block__questions-item questions-item">
                    <div className="question-item__title">
                      <span>{el.number}.</span> {el.title}
                    </div>

                    {!isMobile ? (
                      <div className="question-item__list">
                        {el.options.map((option) => (
                          <RadioLabel
                            key={el.title + option}
                            name={el.title}
                            value={option.value}
                            label={option.label}
                            checked={el.value?.value === option.value}
                            onChange={() =>
                              dispatch(setAnswer({ title: el.title, option }))
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <Select
                      label='Выберите ответ'
                      onSelect={(option) => dispatch(setAnswer({ title: el.title, option }))}
                      value={el.value?.label || ''}
                      options={el.options}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-block__foot quiz-block__foot--center">
        {isBtnActive() && (
          <button className="quiz-block__btn" onClick={onNext}>
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
};

export { QuestionsBlock };
