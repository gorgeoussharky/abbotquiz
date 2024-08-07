import styled from 'styled-components';
import type { RecommendationCardType } from '../../types/interfaces';
import { Item, List } from '../elements';
import { useState } from 'react';

interface Props {
  item: RecommendationCardType;
  unlist?: boolean;
  expandable?: boolean;
}

const Wrap = styled.li<{ $hasIcon: boolean; $expandable?: boolean }>`
  position: relative;
  border-radius: 4px;
  border: 1px solid #009cde;
  background: #fff;
  padding: 12px 16px;
  display: grid;
  align-items: center;
  gap: 12px;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  ${(props) =>
    props.$hasIcon &&
    `
      grid-template-columns: auto 40px;
  `}

  ${(props) =>
    props.$expandable &&
    `
    img {
      position: absolute;
      right: 16px;
      top: 12px;
    }
  `}

  @media (max-width: 991px) {
    padding: 12px;
    gap: 24px;
  }
`;

const ItemTitle = styled.div<{ $expandable?: boolean, $expanded?: boolean }>`
  color: #343a40;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 116%;

  @media (max-width: 991px) {
    font-size: 16px;
  }

  ${(props) =>
    props.$expandable &&
    `
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;

      &::before {
        content: '';
        display: block;
        transform: rotate(-90deg);
        width: 20px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.7688 4.89194C14.0745 5.19235 14.0745 5.67939 13.7688 5.9798L8.55142 11.108C8.40466 11.2523 8.2056 11.3333 7.99803 11.3333C7.79048 11.3333 7.59142 11.2523 7.44464 11.108L2.22722 5.9798C1.92165 5.67939 1.92165 5.19235 2.22722 4.89194C2.53296 4.59155 3.02844 4.59155 3.33401 4.89194L7.99803 9.47623L12.662 4.89194C12.9677 4.59155 13.4632 4.59155 13.7688 4.89194Z' fill='%23009CDE'/%3E%3C/svg%3E%0A");
      }
  `}

${(props) =>
    props.$expanded &&
    `
    color: var(--accent);

      &::before {
        transform: rotate(180deg)
     }
  `}

  span {
    color: var(--accent);
  }
`;

const ItemText = styled.div`
  font-size: 20px;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;

const ItemList = styled(List)<{ $unlist?: boolean }>`
  padding-left: 16px;
  margin-top: 8px;
  margin-bottom: 0;

  @media (max-width: 991px) {
    padding-left: 10px;
  }

  a {
    color: #009cde;
    font-weight: 400;
    line-height: 125%;
    margin-top: 2px;
    text-decoration-line: underline;
    gap: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    text-decoration: none;

    &::after {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.8453 9.92906L8.65469 5.90617L9.75938 4.8457L15.8359 10.679L9.75938 16.5124L8.65469 15.4519L12.8453 11.429H3.33594V9.92906H12.8453Z' fill='%23009CDE'/%3E%3C/svg%3E%0A");
      width: 20px;
      height: 20px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  ${(props) =>
    props.$unlist &&
    `
      padding-left: 0;
  `}
`;

const ItemLink = styled.a<{ $arrow?: boolean }>`
  color: #009cde;
  font-weight: 400;
  line-height: 125%;
  margin-top: 6px;
  text-decoration-line: underline;
  gap: 8px;
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    font-size: 16px;
  }

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
  const [expanded, setExpanded] = useState(false);

  const isExpanded = () => {
    if (item.expandable) return expanded;

    return true;
  };

  return (
    <Wrap
      key={item.title}
      $hasIcon={Boolean(item.icon?.length)}
      $expandable={item.expandable}
    >
      <div>
        <ItemTitle
          $expandable={item.expandable}
          $expanded={expanded}
          dangerouslySetInnerHTML={{ __html: item.title }}
          onClick={() => item.expandable && setExpanded(!expanded)}
        />
        {isExpanded() && (
          <>
            {item.text && (
              <ItemText dangerouslySetInnerHTML={{ __html: item.text }} />
            )}
            {item.list && (
              <ItemList $unlist={item.unlist}>
                {item.list.map((listItem) => (
                  <Item
                    key={listItem}
                    $unlist={item.unlist}
                    dangerouslySetInnerHTML={{ __html: listItem }}
                  ></Item>
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
          </>
        )}
      </div>

      {item.icon && <img src={item.icon} alt={item.title} />}
    </Wrap>
  );
};

export { RecommendationCard };
