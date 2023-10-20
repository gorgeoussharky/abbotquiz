import styled from 'styled-components';
import { Option } from '../../types/interfaces'

interface Props {
  list: Option[],
  className?: string
  onSelect?: (val: Option) => void
}


const Title = styled.div`
  color: #343a40;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        margin-bottom: 4px;

        @media (max-width: 768px) {
          margin-bottom: 12px;
        }
`

const List = styled.ul`
     margin: 0;
        list-style: none;
        padding: 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 6px;
        gap: 6px;


`


const ItemBtn = styled.button`
  position: relative;
        border-radius: 20px;
        border: 1px solid #009cde;
        color: #009cde;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 7px 16px;
        color: #009cde;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
`

const PopularList = ({list, className, onSelect}: Props) => {
  return (
    <div className={className}>
      <Title>Часто ищут</Title>
      <List >
        {list
          .map((el) => (
            <li key={el.label}>
              <ItemBtn
                onClick={() => onSelect && onSelect(el)}
              >
                {el.label}
              </ItemBtn>
            </li>
          ))}
      </List>
    </div>
  );
};

export { PopularList };
