import { Examination, Option } from '../../../types/interfaces';
import { RadioLabel } from '../../form/RadioLabel';
import { Checkbox } from '../../form/Сheckbox/Checkbox';
import { BackLink, Button, Foot, Heading, Subheading } from '../../elements';
import styled from 'styled-components';
import { RadioList } from '../../form/RadioList';

interface Props {
  title: string;
  questions: Examination['questions'];
  children?: JSX.Element | JSX.Element[];
  onChange?: (val: Option, title: string) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const QuestionHeading = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 700;
`

const QuestionsList = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 40px;
`;

const RadioListWrap = styled.div`
  display: grid;
  gap: 12px;
`

const RadioLabelsWrap = styled.div<{$cols: number}>`
  display: grid;
  gap: 12px;
  grid-template-columns: ${props => `repeat(${props.$cols}, 1fr)`};
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const NextBtn = styled(Button)`
  margin-top: 32px;
`;

const QuestionsBlock = ({
  title,
  questions,
  children,
  onBack,
  onChange,
  onNext,
}: Props) => {
  const isBtnActive = () => {
    return questions!.every((el) => typeof el.value?.value !== 'undefined');
  };

  const calcCols = (count: number) => {
    console.log(count)
    if (count >= 6) {
        return 1
    }

    if (count >= 4) {
      return 2
    }


    return 4
  }

  return (
    <div className="quiz-block">
      <BackLink onClick={onBack}>Назад</BackLink>

      <Heading>{title}</Heading>

      <QuestionsList>
        {questions?.map((question) => (
          <div key={question.title}>
            {question.type === 'radio' && (
              <>
                <QuestionHeading>{question?.title}</QuestionHeading>
                <RadioLabelsWrap $cols={calcCols(question.options?.length || 3)}>
                  {question?.options?.map((option) => (
                    <RadioLabel
                      key={option.label + question.title}
                      name={question.title}
                      checked={option.value === question.value?.value}
                      value={option.value}
                      label={option.label}
                      onChange={() =>
                        onChange && onChange(option, question.title)
                      }
                    />
                  ))}
                </RadioLabelsWrap>
              </>
            )}

            {question.type === 'checkbox' && (
              <Checkbox
                label={question.title}
                value={question.title}
                checked={Boolean(question.value?.value)}
                onChange={(checked) =>
                  onChange &&
                  onChange(
                    { label: question.title, value: checked },
                    question.title
                  )
                }
              />
            )}

            {question.type === 'radioList' && (
              <RadioListWrap>
              {question?.options?.map((option) => (
                <RadioList
                  key={option.label + question.title}
                  name={question.title}
                  checked={option.value === question.value?.value}
                  value={option.value}
                  label={option.label}
                  onChange={() => onChange && onChange(option, question.title)}
                />
              ))}
              </RadioListWrap>
            )}

            {question.warning &&
              question.warning.condition === question.value?.value && (
                <div className="quiz-block__warning">
                  {question.warning.text}
                </div>
              )}
          </div>
        ))}
      </QuestionsList>

      {children}

      <Foot $align="flex-end">
        {isBtnActive() && <NextBtn onClick={onNext}>Продолжить</NextBtn>}
      </Foot>
    </div>
  );
};

export { QuestionsBlock };
