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
  onChange?: (val: Option, title: string) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const QuestionHeading = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 700;

  @media (max-width: 991px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const QuestionsList = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
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
        line-height:125%;

      }

      &::before  {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%0A%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='system icon'%3E%3Cpath id='Vector' d='M10.0026 18.8346C14.6051 18.8346 18.3359 15.1038 18.3359 10.5013C18.3359 5.8988 14.6051 2.16797 10.0026 2.16797C5.4001 2.16797 1.66927 5.8988 1.66927 10.5013C1.66927 15.1038 5.4001 18.8346 10.0026 18.8346ZM10.8359 9.66797V14.668H9.16927V9.66797H10.8359ZM10.8359 6.33464V8.0013H9.16927V6.33464H10.8359Z' fill='%23D50032'/%3E%3C/g%3E%3C/svg%3E%0A");
    }
`

const RadioListWrap = styled.div`
  display: grid;
  gap: 12px;
`

const RadioLabelsWrap = styled.div<{$cols: number}>`
  display: grid;
  gap: 12px;
  grid-template-columns: ${props => `repeat(${props.$cols}, 1fr)`};
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`

const NextBtn = styled(Button)`
  margin-top: 32px;

  
  @media (max-width: 991px) {
    margin-top: 0;
  }
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
    if (count >= 6) {
        return 1
    }

    if (count >= 4) {
      return 2
    }


    return 4
  }

  return (
    <QuizWrap>
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
                <QuestionWarning>
                  {question.warning.text}
                </QuestionWarning>
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
