import {
  useAppSelector,
  useAppDispatch,
  useIsMobile,
} from '../../../app/hooks';
import { RadioLabel } from '../../form/RadioLabel';
import { Select } from '../../form/Select';

import {
  BackLink,
  Button,
  Column,
  ColumnsWrap,
  Foot,
  Heading,
  QuizWrap,
  Text,
} from '../../elements';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { selectLPPType, setValue } from '../../../store/lpp/lppTypeSlice';
import { Input } from '../../form/Input';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Subheading = styled.div`
  margin-bottom: 12px;
  padding: 16px 24px;
  border-radius: 4px;
  border: 1px solid var(--accent);
  background: #e6f7ff;
  font-size: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 16px;
  }
`;

const Wrap = styled.div`
  margin-bottom: 40px;
  padding: 16px 24px;
  border: 1px solid var(--accent);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const Helper = styled.button`
  margin-bottom: 20px;
  font-size: 20px;
  color: var(--accent);
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const Values = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ValueItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 20px;
  position: relative;
  padding-left: 28px;

  @media (max-width: 768px) {
    font-size: 16px;
    gap: 4px;
  }

  &:nth-of-type(n + 5) {
    @media (max-width: 768px) {
        > div {
          grid-template-columns: 1fr;
          margin-top: 10px;

          &:first-of-type > div {
            margin-left: -28px;
          }
        }
    }
  }

  span {
    position: absolute;
    font-weight: 700;
    left: 0;
    top: 10px;
    font-size: 20px;

    @media (max-width: 768px) {
    font-size: 16px;
  }
  }
`;

const ValueInput = styled.div`
  display: grid;
  grid-template-columns: auto 148px;
  gap: 32px;
  align-items: center;
  line-height: 125%;

  @media (max-width: 768px) {
    gap: 16px;
  }

  &:nth-of-type(2) {
    @media (max-width: 768px) {
      margin-left: -28px;
    }
  }

  input {
    padding: 10px 16px;
    padding-right: 90px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  label {
    position: absolute;
    right: 16px;
    margin: auto;
    height: fit-content;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
`;

const Notice = styled.div`
  font-size: 20px;
  color: var(--accent);
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 16px;
    font-size: 16px;
  }
`;

const LPPType = ({ onNext, onBack }: Props) => {
  const questions = useAppSelector(selectLPPType);
  const dispatch = useAppDispatch();

  const isBtnActive = () => {
    return !questions.some((el) => typeof el.value_base === 'undefined' || typeof el.value_max === 'undefined');
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Heading>
        Укажите, какие изменения в печеночных тестах наблюдаются у пациента?
      </Heading>

      <Subheading>Определение типа ЛПП</Subheading>

      <Wrap>
        <Title>
          Для расчета показателя R и определения типа ЛПП введите следующие
          значения печеночных проб пациента:
        </Title>

        <Helper>Посмотреть нормальные значения</Helper>

        <Values>
          {questions.map((el, index) => (
            <ValueItem key={el.id}>
              <span>{index + 1}.</span>

              <ValueInput>
                {el.title_base}
                <Input
                  showLabel
                  value={el.value_base || 0}
                  type="number"
                  label={el.unit}
                  onInput={(e) =>
                    dispatch(setValue({ id: el.id, base: e as number }))
                  }
                />
              </ValueInput>

              <ValueInput>
                {el.title_max}
                <Input
                  showLabel
                  value={el.value_max || 0}
                  type="number"
                  label={el.unit}
                  onInput={(e) =>
                    dispatch(setValue({ id: el.id, max: e as number }))
                  }
                />
              </ValueInput>
            </ValueItem>
          ))}
        </Values>

        <Notice>
          *Введите значение, принятое в вашей лаборатории. Верхние границы нормы
          для биохимических показателей могут варьироваться в зависимости от
          лаборатории и используемых методов анализа.
        </Notice>
      </Wrap>

      <Foot $align="flex-end">
        {Boolean(isBtnActive()) && <Button onClick={onNext}>Продолжить</Button>}
      </Foot>
    </QuizWrap>
  );
};

export { LPPType };
