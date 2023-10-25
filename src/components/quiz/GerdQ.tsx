import { useAppSelector, useAppDispatch, useIsMobile } from '../../app/hooks';
import { selectGerdQQuestions } from '../../store/gerdQQuestionsSlice';
import { RadioLabel } from '../form/RadioLabel';
import { setAnswer } from '../../store/gerdQQuestionsSlice';
import { Select } from '../form/Select';

import {
  BackLink,
  Button,
  Column,
  ColumnsWrap,
  Foot,
  Heading,
  QuizWrap,
  Text,
} from '../elements';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const List = styled.div`
  display: grid;
  gap: 40px;

  @media (max-width: 991px) {
    gap: 20px;
  }
`;

const ItemTitle = styled.div`
  position: relative;
  color: #343a40;
  font-size: 20px;
  display: flex;
  font-weight: 700;
  line-height: 125%;
  margin-bottom: 8px;
  gap: 8px;

  @media (max-width: 991px) {
    font-size: 16px;
    padding-left: 0;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const GerdQ = ({ onNext, onBack }: Props) => {
  const questions = useAppSelector(selectGerdQQuestions);
  const location = useLocation();

  // Другая градация баллов для контрольного приема
  const questionsGradation = () => {
    if (location.pathname === '/control') {
      return questions.map((el) => {
        if (
          el.title ===
            'Как часто пациент ощущал боль в центре верхней части живота?' ||
          el.title === 'Как часто пациент ощущал тошноту?'
        ) {
          return {
            ...el,
            options: [
              {
                label: '0 дней',
                value: 3,
              },
              {
                label: '1 день',
                value: 2,
              },
              {
                label: '2-3 дня',
                value: 1,
              },
              {
                label: '4-7 дней',
                value: 0,
              },
            ],
          };
        }

        return el
      });
    }

    return questions;
  };

  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const questionsNumbered = () => {
    return questionsGradation().map((question, key) => {
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
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Heading>ТЕСТ GERD Q</Heading>

      <Text>За последнюю неделю:</Text>

      <ColumnsWrap>
        <Column>
          <List>
            {questionsNumbered()
              .slice(0, Math.floor(questions.length / 2))
              .map((el) => (
                <div key={el.title}>
                  <ItemTitle>
                    <span>{el.number}.</span> {el.title}
                  </ItemTitle>
                  {!isMobile ? (
                    <ItemList>
                      {el.options!.map((option) => (
                        <RadioLabel
                          key={el.title + option.label}
                          name={el.title}
                          value={option.value}
                          label={option.label}
                          checked={el.value?.value === option.value}
                          onChange={() =>
                            dispatch(setAnswer({ title: el.title, option }))
                          }
                        />
                      ))}
                    </ItemList>
                  ) : (
                    <Select
                      label="Выберите ответ"
                      onSelect={(option) =>
                        dispatch(setAnswer({ title: el.title, option }))
                      }
                      value={el.value?.label || ''}
                      options={el.options!}
                    />
                  )}
                </div>
              ))}
          </List>
        </Column>

        <Column>
          <List>
            {questionsNumbered()
              .slice(Math.floor(questions.length / 2))
              .map((el) => (
                <div key={el.title}>
                  <ItemTitle>
                    <span>{el.number}.</span> {el.title}
                  </ItemTitle>

                  {!isMobile ? (
                    <ItemList>
                      {el.options!.map((option) => (
                        <RadioLabel
                          key={el.title + option.label}
                          name={el.title}
                          value={option.value}
                          label={option.label}
                          checked={el.value?.value === option.value}
                          onChange={() =>
                            dispatch(setAnswer({ title: el.title, option }))
                          }
                        />
                      ))}
                    </ItemList>
                  ) : (
                    <Select
                      label="Выберите ответ"
                      onSelect={(option) =>
                        dispatch(setAnswer({ title: el.title, option }))
                      }
                      value={el.value?.label || ''}
                      options={el.options!}
                    />
                  )}
                </div>
              ))}
          </List>
        </Column>
      </ColumnsWrap>

      <Foot $align="center">
        {Boolean(isBtnActive()) && <Button onClick={onNext}>Продолжить</Button>}
      </Foot>
    </QuizWrap>
  );
};

export { GerdQ };
