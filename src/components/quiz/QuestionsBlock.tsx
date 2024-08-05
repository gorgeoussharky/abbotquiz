import { Examination, Option } from '../../types/interfaces';
import { RadioLabel } from '../form/RadioLabel';
import { Checkbox } from '../form/Checkbox';
import { BackLink, Button, Foot, Heading, QuizWrap } from '../elements';
import styled from 'styled-components';
import { RadioList } from '../form/RadioList';

interface Props {
  title: string;
  questions: Examination['questions'];
  children?: JSX.Element | JSX.Element[];
  cols?: number
  hideBtn?: boolean;
  alwaysShowBtn?: boolean
  onChange?: (val: Option, id: string) => void;
  onGroupCheckboxChange?: (value: boolean, optionIndex: number, groupId: string, questionId: string, valueIndex: number) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const QuestionHeading = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 700;

  ul {
    margin-top: 4px;
  }

  span {
    color: var(--accent);
    font-weight: 700;
  }

  @media (max-width: 991px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const QuestionsList = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${props => props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr'};
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    margin-bottom: 0;
    gap: 16px;
  }
`;

const QuestionWarning = styled.div`
  font-size: 20px;
  line-height: 25px;
  padding-left: 28px;
  color: #d50032;
  position: relative;
  margin-top: 20px;

  @media (max-width: 991px) {
    font-size: 16px;
    margin-top: 12px;
    line-height: 125%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%0A%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='system icon'%3E%3Cpath id='Vector' d='M10.0026 18.8346C14.6051 18.8346 18.3359 15.1038 18.3359 10.5013C18.3359 5.8988 14.6051 2.16797 10.0026 2.16797C5.4001 2.16797 1.66927 5.8988 1.66927 10.5013C1.66927 15.1038 5.4001 18.8346 10.0026 18.8346ZM10.8359 9.66797V14.668H9.16927V9.66797H10.8359ZM10.8359 6.33464V8.0013H9.16927V6.33464H10.8359Z' fill='%23D50032'/%3E%3C/g%3E%3C/svg%3E%0A");
  }
`;

const RadioListWrap = styled.div<{ $cols?: number }>`
  display: grid;
  gap: 18px;
  grid-template-columns: ${(props) => `repeat(${props.$cols}, 1fr)`};
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const RadioLabelsWrap = styled.div<{ $cols: number }>`
  display: grid;
  gap: 12px;
  grid-template-columns: ${(props) => `repeat(${props.$cols}, 1fr)`};
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxList = styled.div<{ $cols?: number }>`
  display: grid;
  gap: 10px 8px;
  grid-template-columns: ${props => props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr 1fr'};
  align-items: start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const NextBtn = styled(Button)`
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 0;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const QuestionTableHeading = styled.div`
  display: grid;
  grid-template-columns: 140px 140px;
  font-size: 16px;

  @media (max-width: 991px) {
    font-size: 12px;
    grid-template-columns: 70px 70px;
    gap: 20px;
  }
`

const GroupTitle = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  color: var(--accent);

  @media (max-width: 991px) {
    font-size: 16px;
  }
`

const GroupQuestion = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-content: center;
  justify-content: space-between;

`

const GroupInputs = styled.div`
  display: grid;
  grid-template-columns: 140px 140px;
  gap: 10px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 70px 70px;
  }

  > div {
    display: flex;
    justify-content: center;
  }
`

const GroupContent = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
`

const GroupQuestionLabel = styled.div`
    font-size: 20px;

  @media (max-width: 991px) {
    font-size: 14px;
    padding-right: 20px;
  }
`

const QuestionsBlock = ({
  title,
  questions,
  children,
  cols,
  hideBtn,
  alwaysShowBtn,
  onBack,
  onChange,
  onNext,
  onGroupCheckboxChange
}: Props) => {
  const isBtnActive = () => {
    if (alwaysShowBtn) return true
    if (hideBtn) return false
    return questions!.filter(el => !el.optional).every((el) => typeof el.value?.value !== 'undefined');
  };

  const calcCols = (count: number) => {
    if (count >= 6) {
      return 1;
    }

    if (count >= 4) {
      return 2;
    }

    return 4;
  };

  const checkCondition = (condition?: { question: string, value: string | number }) => {
    if (!condition) return true

    const conditionQuestion = questions?.find((el) => el.id === condition.question)

    return conditionQuestion?.value?.value === condition.value;
  };

  const handleGroupCheckboxChange = (value: boolean, label: string, groupId: string, questionId: string, valueIndex: number) => {
    const question = questions?.find((el) => el.id === questionId);
    if (!question) return;

    const group = question.groups?.find((el) => el.id === groupId);

    if (!group) return;

    const optionIndex = group.options.findIndex((el) => el.label === label);

    if (optionIndex < 0) return;

    onGroupCheckboxChange && onGroupCheckboxChange(value, optionIndex, groupId, questionId, valueIndex);
  }

  const handleCheckboxChange = (val: Option, id: string) => {
    const question = questions?.find((el) => el.id === id);

    if (!question) return;

    if (!question.value) {
      onChange &&
        onChange(
          {
            label: val.label,
            value: JSON.stringify([val]),
          },
          id
        );
      return;
    }

    let value = JSON.parse(question.value.value as string) as Option[];

    if (value.some((el) => el.value === val.value)) {
      value = value.filter((el) => el.value !== val.value);
    } else {
      value.push(val);
    }

    if (question.type === 'singular_checkbox') {
      value = [val]
    }

    onChange &&
      onChange(
        {
          label: val.label,
          value: JSON.stringify(value),
        },
        id
      );
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Heading>{title}</Heading>

      <QuestionsList $cols={cols}>
        {questions?.map((question) => (
          <div key={question.id}>
            {checkCondition(question.condition) && (
              <div>
                {question.type === 'radio' && (
                  <>
                    <QuestionHeading
                      dangerouslySetInnerHTML={{ __html: question.title }}
                    />
                    <RadioLabelsWrap
                      $cols={question.cols || calcCols(question.options?.length || 3)}
                    >
                      {question?.options?.map((option) => (
                        <RadioLabel
                          key={option.label + question.id}
                          name={question.title}
                          checked={option.value === question.value?.value}
                          value={option.value}
                          label={option.label}
                          onChange={() =>
                            onChange && onChange(option, question.id)
                          }
                        />
                      ))}
                    </RadioLabelsWrap>
                  </>
                )}

                {(question.type === 'checkbox' || question.type === 'singular_checkbox') && (
                  <>
                    <QuestionHeading
                      dangerouslySetInnerHTML={{ __html: question.title }}
                    />
                    {question.subtitle && (
                      <GroupTitle>{question.subtitle}</GroupTitle>
                    )}
                    <CheckboxList $cols={question.cols}>
                      {question?.options?.map((option) => (
                        <Checkbox
                          key={option.label}
                          label={option.label}
                          value={option.label}
                          checked={question.value ? JSON.parse((question.value?.value as string)
                          ).some((el: Option) => el.value === option.value) : false}
                          onChange={() =>
                            handleCheckboxChange(option, question.id)
                          }
                        />
                      ))}
                    </CheckboxList>
                  </>
                )}

                {question.type === 'radioList' && (
                  <RadioListWrap $cols={question.cols}>
                    {question?.options?.map((option) => (
                      <RadioList
                        key={option.label + question.id}
                        name={question.title}
                        checked={option.value === question.value?.value}
                        value={option.value}
                        cols={option.cols}
                        pill={question.pill}
                        title={option.title}
                        label={option.label}
                        onChange={() =>
                          onChange && onChange(option, question.id)
                        }
                      />
                    ))}
                  </RadioListWrap>
                )}

                {question.type === 'variants_checkbox' && (
                  <>
                    <Head>
                      <QuestionHeading
                        dangerouslySetInnerHTML={{ __html: question.title }}
                      />
                      <QuestionTableHeading>
                        <div>Результат отрицательный</div>
                        <div>Не выполнено</div>
                      </QuestionTableHeading>
                    </Head>

                    {question.groups?.map((group) => (
                      <div key={group.id}>
                        <GroupTitle>{group.title}</GroupTitle>
                        <GroupContent>
                        {group.options.map((option) => (
                          <GroupQuestion key={option.label}>
                            <GroupQuestionLabel>{option.label}</GroupQuestionLabel>
                          
                          <GroupInputs>
                            <Checkbox

                              label={option.label}
                              hideLabel
                              value={option.label}
                              checked={option.value[0]}
                              onChange={(checked) =>
                                handleGroupCheckboxChange(checked, option.label, group.id, question.id, 0)
                              }
                            />
                            <Checkbox
                              hideLabel
                              label={option.label}
                              value={option.label}
                              checked={option.value[1]}
                              onChange={(checked) =>
                                handleGroupCheckboxChange(checked, option.label, group.id, question.id, 1)
                              }
                            />
                          </GroupInputs>
                          </GroupQuestion>
                        ))}
                        </GroupContent>
                      </div>
                    ))}
                  </>
                )}

                {question.warning &&
                  question.warning.condition === question.value?.value && (
                    <QuestionWarning>{question.warning.text}</QuestionWarning>
                  )}
              </div>
            )}
          </div>
        ))}
      </QuestionsList>

      {children}

      <Foot $align="flex-end">
        {isBtnActive() && <NextBtn onClick={onNext}>Продолжить</NextBtn>}
      </Foot>
    </QuizWrap>
  );
};

export { QuestionsBlock };
