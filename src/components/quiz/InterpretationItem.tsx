import styled from 'styled-components';
import { InterpretationItemType } from '../../types/interfaces';
import { useState } from 'react';

interface Props {
  item: InterpretationItemType;
  expand?:boolean
  transparent?: boolean
}

const Wrap = styled.div<{$expanded: boolean, $transparent?: boolean}>`
  border-radius: 4px;
  border: 1px solid #009cde;
  background: #e6f7ff;
  padding: 16px;

  ${props => props.$transparent && `
    background: transparent;
  `}

  ${props => props.$expanded && `
    background: transparent;
  `}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.div`
  font-size: 24px;
  font-weight: 700;
  display: flex;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1;
  }
`;

const Toggler = styled.button`
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration-line: underline;
  font-size: 16px;
  gap: 8px;
`;

const Content = styled.div`
  margin-top: 12px;
`

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  object-fit: contain;
`

const InterpretationItem = ({ item, expand, transparent }: Props) => {
  const [expanded, setExpanded] = useState(expand || false);

  return (
    <Wrap $expanded={expanded} $transparent={transparent}>
      <Head>
        <Info>
          {item.icon && <Icon src={item.icon} />}
          <div>
          <div style={{display: 'flex', flexDirection: 'column'}}>{expanded ? (item.subtitle || item.title) : item.title}</div>
          {item.code && <div>{item.code}</div>}
          </div>
        </Info>
        {!expanded && item.content && (
          <Toggler onClick={() => setExpanded(true)}>
            Подробнее
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7708 5.39261C14.0764 5.69302 14.0764 6.18007 13.7708 6.48048L8.55338 11.6087C8.40661 11.7529 8.20755 11.834 7.99998 11.834C7.79243 11.834 7.59337 11.7529 7.44659 11.6087L2.22917 6.48048C1.92361 6.18007 1.92361 5.69302 2.22917 5.39261C2.53491 5.09222 3.03039 5.09222 3.33596 5.39261L7.99998 9.97691L12.664 5.39261C12.9696 5.09222 13.4651 5.09222 13.7708 5.39261Z"
                fill="#009CDE"
              />
            </svg>
          </Toggler>
        )}
      </Head>

      {expanded && item.content && (
       <Content>
        {item.content()}
        </Content>
        )}

      {expanded && (
        <Toggler onClick={() => setExpanded(false)}>
            Свернуть
        </Toggler>
      )}
    </Wrap>
  );
};

export { InterpretationItem };
