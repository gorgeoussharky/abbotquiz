import styled from 'styled-components';
import type { RecommendationCardType } from '../../types/interfaces';
import { Item, List } from '../elements';

interface Props {
  item: RecommendationCardType;
}

const Wrap = styled.li`
  position: relative;
  border-radius: 4px;
  border: 1px solid #009cde;
  background: #fff;
  padding: 16px;
  display: grid;
  align-items: center;
  grid-template-columns: auto 40px;
  gap: 12px;
`;

const ItemTitle = styled.div`
  color: #343a40;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 116%;

  span {
    color: var(--accent);
  }
`;

const ItemText = styled.div`
  font-size: 20px;
`;

const ItemList = styled(List)`
  padding-left: 16px;
  margin-top: 8px;
  margin-bottom: 0;
`

const ItemLink = styled.a<{ $arrow?: boolean }>`
  color: #009cde;
  font-weight: 400;
  line-height: 125%;
  margin-top: 6px;
  text-decoration-line: underline;
  gap: 8px;
  display: flex;
  align-items: center;

  ${(props) =>
    props.$arrow &&
    `
      text-decoration: none;
      &::after {
        content: '';
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.8453 9.92906L8.65469 5.90617L9.75938 4.8457L15.8359 10.679L9.75938 16.5124L8.65469 15.4519L12.8453 11.429H3.33594V9.92906H12.8453Z' fill='%23009CDE'/%3E%3C/svg%3E%0A");
        width: 20px;
        height: 20px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }`}
`;

const RecommendationCard = ({ item }: Props) => {
  return (
    <Wrap key={item.title}>
      <div>
        <ItemTitle dangerouslySetInnerHTML={{ __html: item.title }} />
        {item.text && (
          <ItemText dangerouslySetInnerHTML={{ __html: item.text }} />
        )}
         {item.list && (
          <ItemList>
            {item.list.map((item) => (
              <Item>{item}</Item>
            ))}
          </ItemList>
        )}
        {item.children}
        {item.link && (
          <ItemLink
            $arrow={item.linkHasArrow}
            href={item.link}
            rel="noreferrer"
            target="_blank"
          >
            {item.linkLabel}
          </ItemLink>
        )}
      </div>

      {item.icon && <img src={item.icon} alt={item.title} />}
    </Wrap>
  );
};

export { RecommendationCard };
