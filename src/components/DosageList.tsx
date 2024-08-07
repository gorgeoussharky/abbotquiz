import styled from 'styled-components';

const Title = styled.div<{ $small?: boolean }>`
  font-size: ${(props) => (props.$small ? '17px' : '20px')};
  font-style: normal;
  font-weight: 700;
  line-height: 100%;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;

const Head = styled.div`
  margin-bottom: 12px;

  @media (max-width: 991px) {
    margin-bottom: 10px;
  }
`;

const List = styled.ul<{ $cols?: number }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr 1fr'};
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Item = styled.li`
  font-size: 20px;
  padding-left: 20px;
  position: relative;
  line-height: 1;

  @media (max-width: 991px) {
    font-size: 16px;
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    left: 0;
    top: 8px;
    border-radius: 50%;
    background-color: #343a40;

    @media (max-width: 991px) {
      top: 10px;
    }
  }

  div {
    max-width: 90%;
  }

  span {
    color: #8c8c8c;
    font-size: 14px;
    display: block;
    margin-top: 4px;
  }
`;

const Level = styled.div`
  font-size: 16px;
  margin-top: 8px;
  color: var(--accent);
`;

interface Props {
  title?: string;
  level?: string;
  smallTitle?: boolean;
  className?: string;
  cols?: number;
  list: {
    title: string;
    dosage?: string;
    level?: string;
  }[];
}

const DosageList = ({
  list,
  cols,
  className,
  title,
  level,
  smallTitle,
}: Props) => {
  return (
    <div className={className}>
      <Head>
        {title && <Title $small={smallTitle}>{title}</Title>}
        {level && <Level style={{marginTop: 0}}>Уровень рекомендаций {level}</Level>}
      </Head>
      <List $cols={cols}>
        {list.map((item) => (
          <Item key={item.title}>
            <div>{item.title}</div>
            {item.level && <Level>Уровень рекомендаций {item.level}</Level>}
            {item.dosage && (
              <span dangerouslySetInnerHTML={{ __html: item.dosage }}></span>
            )}
          </Item>
        ))}
      </List>
    </div>
  );
};

export { DosageList };
