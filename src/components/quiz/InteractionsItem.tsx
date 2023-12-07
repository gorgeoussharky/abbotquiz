import styled from 'styled-components';
import { InteractionDBEntry } from '../../types/interfaces';
import { useState } from 'react';
import { Text } from '../elements';

interface Props {
  item: InteractionDBEntry;
}

const getRiskColor = (risk?: string) => {
  switch (risk) {
    case 'Высокий':
      return '#FF0000';
    case 'Средний':
      return '#FFCD0E';
    case 'Умеренный':
      return '#FFCD0E';
    case 'Незначительный':
      return '#00B140';
    case 'Низкий':
      return '#00B140';
  }
};

const Wrap = styled.li<{ $inactive?: boolean }>`
  padding: 20px;
  border-radius: 4px;
  border: 1px solid var(--accent);
  min-width: 1px;

  ${(props) =>
    props.$inactive &&
    `
    background: #F6FBFF;
  `}
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Meta = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const MetaItem = styled.li`
  font-weight: 700;
  font-size: 16px;
  color: #bdbdbd;

  span {
    color: #343a40;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const RiskValue = styled.span<{ $risk?: string }>`
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    background-color: ${(props) => getRiskColor(props.$risk)};
  }
`;

const Description = styled.div`
  margin-bottom: 20px;
  font-size: 16px;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const TacticsToggle = styled.button`
  font-size: 20px;
  color: var(--accent);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  align-items: center;
`;

const TacticsContent = styled.div`
  margin-top: 10px;
  font-size: 16px;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const InteractionItem = ({ item }: Props) => {
  const [showTactics, setShowTactics] = useState(false);

  if (!item.id) {
    return (
      <Wrap $inactive>
        <Title>
          {item.name} x {item.mainMed}
        </Title>
        <Text>Клинически значимых взаимодействий не описано</Text>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Title>
        {item.name} x {item.mainMed}
      </Title>

      <Meta>
        <MetaItem>
          Риск для пациента
          <RiskValue $risk={item.risk}>{item.risk}</RiskValue>
        </MetaItem>

        <MetaItem>
          Рекомендация
          <span>{item.recommendations}</span>
        </MetaItem>

        <MetaItem>
          Уровень достоверности
          <span>{item.level}</span>
        </MetaItem>
      </Meta>

      {item.description && (
        <Description
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></Description>
      )}

      <TacticsToggle onClick={() => setShowTactics(!showTactics)}>
        Тактика ведения пациента
        <svg
          transform={`rotate(${!showTactics ? '180' : '0'})`}
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16344_51565)">
            <rect
              width="24"
              height="24"
              transform="matrix(1 0 0 -1 0 24.5)"
              fill="white"
            />
            <rect
              x="0.6"
              y="-0.6"
              width="22.8"
              height="22.8"
              rx="11.4"
              transform="matrix(1 0 0 -1 0 23.3)"
              stroke="#009CDE"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M17.4129 14.6262L12 9.21329L6.58711 14.6262"
              stroke="#009CDE"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </TacticsToggle>

      {showTactics && item.tactik && (
        <TacticsContent dangerouslySetInnerHTML={{ __html: item.tactik }} />
      )}
    </Wrap>
  );
};

export { InteractionItem };
