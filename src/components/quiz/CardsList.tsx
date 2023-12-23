import styled from 'styled-components';

import type { RecommendationCardType } from '../../types/interfaces';
import { RecommendationCard } from './RecommendationCard';
import { Notification  } from './Notification';

interface Props {
  title?: string;
  notifications?: string[]
  hasBorder?: boolean;
  list?:RecommendationCardType[];
  cols?: number
}

const Wrap = styled.div<{$border?: boolean}>`
    margin-bottom: 12px;

   ${props => props.$border && `
      border-bottom: 1px solid #BDBDBD;
      padding-bottom: 12px;
   `}
`

const Title = styled.div`
  color: var(--accent);
  line-height: 150%;
  font-size: 20px;
  margin-bottom: 12px;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;

const List = styled.ul<{$cols?:number}>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: ${props => props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr'};
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


const CardsList = ({ title, list, hasBorder, notifications, cols }: Props) => {
  return (
    <Wrap $border={hasBorder}>
      {title && <Title>{title}</Title>}
      <List $cols={cols}>
        {list?.map((item) => (
          <RecommendationCard key={item.title} item={item} />
        ))}
        {notifications?.map((el) => (
          <Notification content={el} key={el} />
        ))}
      </List>
    </Wrap>
  );
};

export { CardsList };
