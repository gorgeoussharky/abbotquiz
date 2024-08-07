import styled from 'styled-components';

interface Props {
  hasAnds?: boolean;
  bold?: boolean;
  list: string[];
  className?: string
}

const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 20px;
  line-height: 125%;
  align-items: center;
  margin-bottom: 16px;
`;

const Item = styled.li<{ $bold?: boolean; $hasAnds?: boolean }>`
  display: flex;
  border: 1px solid rgb(0, 156, 222, 0.2);
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 20px;
  line-height: 125%;

  @media (max-width: 576px) {
    font-size: 16px;
  }
  
  ${props => props.$bold && `
    font-weight: 700;
  `}

  ${props => props.$hasAnds && `
      &::after {
        content: 'или';
        font-weight: 400;
        margin-left: 16px;
      }
    `}
`;

const Tags = ({ list, bold, hasAnds, className }: Props) => {
  return (
    <div className={className}>
      <List>
        {list.map((item) => (
          <>
          <Item $bold={bold} key={item}>{item}</Item>
          {hasAnds && 'или'}
          </>
        ))}
      </List>
    </div>
  );
};

export { Tags };
