import styled from 'styled-components';
import { Item } from '../elements';

interface Props {
  list: string[];
  className?: string;
}

const List = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px 24px;
  margin-bottom: 12px;
`;

const CheckItem = styled(Item)`
  padding-left: 32px;

  &::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5 12L10 17L20 7' stroke='%23009CDE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    width: 24px;
    height: 24px;
    background-color: transparent;
    border-radius: 0;
    top: 4px;
  }
`;

const ChecksList = ({ list, className }: Props) => {
  return (
    <List className={className}>
      {list.map((el) => (
        <CheckItem key={el}>{el}</CheckItem>
      ))}
    </List>
  );
};

export { ChecksList };
