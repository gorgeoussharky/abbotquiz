import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  BackLink,
  Button,
  Foot,
  Heading,
  QuizWrap,
  Text,
} from '../../elements';
import styled from 'styled-components';
import { selectLPPType, updateList } from '../../../store/lpp/lppTypeSlice';
import { Input } from '../../form/Input';
import { useState } from 'react';
import { LPPTypeEntry } from '../../../types/interfaces';
import { Dropdown } from '../../Dropdown';

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

const HelperToggle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  color: var(--accent);
  text-decoration: underline;
  width: fit-content;
  cursor: pointer;

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

const HelperContent = styled.div`
  padding: 20px 32px;
  padding-top: 40px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 4px;
  max-width: 1024px;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  background: transparent;
  border: none;
`;

const HelperList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HelperItem = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(0, 156, 222, 0.2);
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const helperValues = [
  {
    title: 'Аспартатаминотрансфераза (АСТ)',
    men: '<40 Ед/л',
    women: '<32 Ед/л',
  },
  {
    title: 'Аланинаминотрансфераза (АЛТ)',
    men: '<41 Ед/л',
    women: '<33 Ед/л',
  },
  {
    title: 'Щелочная фосфатаза (ЩФ)',
    men: '40 – 130 Ед/л',
    women: '35 – 105 Ед/л',
  },
  {
    title: 'Гамма-глютамилтранспептидаза (ГГТ)',
    men: '<60 Ед/л',
    women: '<40 Ед/л',
  },
  {
    title: 'Билирубин общий',
    value: '<21 мкмоль/л',
  },
  {
    title: 'Билирубин прямой',
    value: '≤5 мкмоль/л',
  },
];

const LPPType = ({ onNext, onBack }: Props) => {
  const questions = useAppSelector(selectLPPType);
  const dispatch = useAppDispatch();

  const [showHelper, setShowHelper] = useState(false);
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [localQuestions, setLocalQuestions] =
    useState<LPPTypeEntry[]>(questions);

  const isBtnActive = () => {
    return !localQuestions.some(
      (el) =>
        typeof el.value_base === 'undefined' ||
        typeof el.value_max === 'undefined'
    );
  };

  const setValue = (id: string, base?: number, max?: number) => {
    const clone = structuredClone(localQuestions);
    const questionIndex = clone.findIndex((el) => el.id === id);

    if (typeof base !== 'undefined') {
      clone[questionIndex].value_base = base;
    }

    if (typeof max !== 'undefined') {
      clone[questionIndex].value_max = max;
    }

    setLocalQuestions(clone);
  };

  const handleNext = () => {
    dispatch(updateList({ list: localQuestions }));
    onNext();
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

        <HelperToggle onClick={() => setShowHelper(true)} ref={setAnchor}>
          Посмотреть нормальные значения
        </HelperToggle>

        {showHelper && anchor && (
          <Dropdown anchor={anchor} onClose={() => setShowHelper(false)}>
            <HelperContent>
              <CloseBtn>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.37612 3.89251C3.61701 3.65148 3.9437 3.51607 4.28433 3.51607C4.62496 3.51607 4.95165 3.65148 5.19255 3.89251L11.992 10.6978L18.7914 3.89251C18.9099 3.76971 19.0516 3.67177 19.2084 3.60438C19.3651 3.537 19.5337 3.50153 19.7042 3.50005C19.8748 3.49857 20.044 3.5311 20.2018 3.59574C20.3597 3.66039 20.5031 3.75586 20.6237 3.87658C20.7444 3.9973 20.8397 4.14085 20.9043 4.29886C20.9689 4.45687 21.0014 4.62617 21 4.79689C20.9985 4.9676 20.963 5.13631 20.8957 5.29318C20.8284 5.45004 20.7305 5.59191 20.6078 5.71051L13.8084 12.5158L20.6078 19.3211C20.8418 19.5636 20.9713 19.8883 20.9684 20.2255C20.9655 20.5626 20.8304 20.885 20.5922 21.1234C20.354 21.3618 20.0318 21.497 19.695 21.5C19.3582 21.5029 19.0337 21.3733 18.7914 21.1391L11.992 14.3338L5.19255 21.1391C4.95027 21.3733 4.62577 21.5029 4.28895 21.5C3.95214 21.497 3.62994 21.3618 3.39176 21.1234C3.15359 20.885 3.01849 20.5626 3.01556 20.2255C3.01263 19.8883 3.14211 19.5636 3.37612 19.3211L10.1755 12.5158L3.37612 5.71051C3.13529 5.46941 3 5.14244 3 4.80151C3 4.46059 3.13529 4.13362 3.37612 3.89251Z"
                    fill="#8C8C8C"
                  />
                </svg>
              </CloseBtn>

              <Text>
                Приведены верхние пределы нормального значения* для пациентов
                старше 18 лет:
              </Text>

              <HelperList>
                {helperValues.map((el) => (
                  <HelperItem key={el.title}>
                    <b>{el.title}</b>
                    {el.value && <span>{el.value}</span>}
                    {el.men && <span>мужчины: {el.men}</span>}

                    {el.women && <span>женщины: {el.women}</span>}
                  </HelperItem>
                ))}
              </HelperList>

              <Text>
                *Усредненные показатели нормы на случай, если неизвестно
                нормальное значение, принятое в вашей лаборатории.
              </Text>
            </HelperContent>
          </Dropdown>
        )}

        <Values>
          {localQuestions.map((el, index) => (
            <ValueItem key={el.id}>
              <span>{index + 1}.</span>

              <ValueInput>
                {el.title_base}
                <Input
                  showLabel
                  value={el.value_base || 0}
                  type="number"
                  label={el.unit}
                  onInput={(e) => setValue(el.id, e as number)}
                />
              </ValueInput>

              <ValueInput>
                {el.title_max}
                <Input
                  showLabel
                  value={el.value_max || 0}
                  type="number"
                  label={el.unit}
                  onInput={(e) => setValue(el.id, undefined, e as number)}
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
        {Boolean(isBtnActive()) && (
          <Button onClick={handleNext}>Продолжить</Button>
        )}
      </Foot>
    </QuizWrap>
  );
};

export { LPPType };
