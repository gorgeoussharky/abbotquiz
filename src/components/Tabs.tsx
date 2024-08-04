import styled from 'styled-components';

interface Props {
  list: string[];
  activeItem: string;
  onSelect: (item: string) => void;
  className?: string;
}

const List = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  border: 1px solid var(--accent);
  border-radius: 20px;
  width: fit-content;
`;

const ItemBtn = styled.button<{ $active: boolean }>`
  padding: 12px 16px;
  color: var(--accent);
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 20px;

  @media (max-width: 576px) {
    padding: 12px 8px;
  }

  ${props => props.$active && `
    color: #fff;
    background: var(--accent);
  `}
`;

const Tabs = ({ list, activeItem, onSelect, className }: Props) => {
  return (
    <div className={className}>
      <List>
        {list.map((item) => (
          <li key={item}>
            <ItemBtn
              $active={item === activeItem}
              onClick={() => onSelect(item)}
            >
              {item}
            </ItemBtn>
          </li>
        ))}
      </List>
    </div>
  );
};

export { Tabs }