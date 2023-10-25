import { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../form/Input';

const InputX = styled(Input)`
  margin-bottom: 12px;
  
  input {
    max-width: 150px;
  }

  &::after {
    content: 'X';
    position: absolute;
    left: 130px;
    bottom: 10px;
  }
`;

const InputY = styled(Input)`
  margin-bottom: 12px;

  input {
    max-width: 150px;
  }

  &::after {
    content: 'Y';
    position: absolute;
    left: 130px;
    bottom: 10px;
  }
`;

const Toggler = styled.button`
  font-size: 20px;
  font-weight: 700;
  padding: 16px 24px;
  border-radius: 4px;
  border: 1px solid var(--accent);
  background: #e6f7ff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 991px) {
      font-size: 16px;
      margin-top: 24px;
  } 
`;

const Content = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid var(--accent);
  margin-top: 12px;

  @media (max-width: 991px) {
    margin-top: 24px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;

  
  @media (max-width: 991px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const CalcIndexSymptom = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [show, setShow] = useState(false);

  const index = () => {
    if (y < 1) return 0
    return Math.round((x / y) * 100) + '%';
  };

  return (
    <div>
      <Toggler onClick={() => setShow(!show)}>
        Рассчитать индекс симптома
        <svg
          transform={`rotate(${show ? '180' : '0'})`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.6562 7.83794C21.1146 8.28856 21.1146 9.01912 20.6562 9.46974L12.8301 17.1621C12.6099 17.3784 12.3113 17.5 12 17.5C11.6887 17.5 11.3901 17.3784 11.1699 17.1621L3.34376 9.46974C2.88541 9.01912 2.88541 8.28856 3.34376 7.83794C3.80237 7.38735 4.54559 7.38735 5.00394 7.83794L12 14.7144L18.996 7.83794C19.4544 7.38735 20.1977 7.38735 20.6562 7.83794Z"
            fill="#8C8C8C"
          />
        </svg>
      </Toggler>
      {show && (
        <Content>
          <Title>Расчет Индекса симптома (ИС): {index()}</Title>

          <InputX
            onInput={(val) => setX(val as number)}
            showLabel
            value={x}
            type="number"
            label="Введите количество рефлюксов, которые сопровождались снижением pH менее 4,0 в ходе pH-импедансометрии:"
          />
          <InputY
            onInput={(val) => setY(val as number)}
            showLabel
            value={y}
            type="number"
            label="Введите количество эпизодов ГЭРБ, которые возникали у пациента в течение всего времени проведения исследования:"
          />
        </Content>
      )}
    </div>
  );
};

export { CalcIndexSymptom };
