import styled from 'styled-components';

const Title = styled.div<{$small?: boolean}>`
  font-size: ${props => props.$small ? '17px' : '20px'};
  font-style: normal;
  font-weight: 700;
  margin-bottom: 12px;
`

const List = styled.ul<{ $cols?: number }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr 1fr'};
  gap: 0 12px;
  margin-bottom: 12px;
`;

const Item = styled.li`
  font-size: 20px;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    left: 0;
    top: 14px;
    border-radius: 50%;
    background-color: #343a40;
  }

  span {
    color: #8c8c8c;
    font-size: 14px;
    display: block;
  }
`;

interface Props {
  title?: string;
  smallTitle?: boolean
  className?: string;
  cols?: number;
  list: {
    title: string;
    dosage?: string;
  }[];
}

const DosageList = ({ list, cols, className, title, smallTitle }: Props) => {
  return (
    <div className={className}>
      {title && <Title $small={smallTitle}>{title}</Title>}
      <List $cols={cols}>
        {list.map((item) => (
          <Item>
            {item.title}
            {item.dosage && <span>{item.dosage}</span>}
          </Item>
        ))}
      </List>
    </div>
  );
};

export { DosageList };
