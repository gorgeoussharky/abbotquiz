import { Link } from 'react-router-dom';

import styled from 'styled-components';

interface AppointmentItemType {
  title: string;
  list: string[];
  route: string;
  ymTarget?: string;
}

interface Props {
  item: AppointmentItemType;
  onClick?: () => void;
}

const Wrap = styled.li`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(33.33% - 28px);
  width: calc(33.33% - 28px);
  margin: 20px 14px 0;

  @media (max-width: 992px) {
    flex: 0 0 calc(50% - 28px);
    width: calc(50% - 28px);
  }

  @media (max-width: 991px) {
    flex: 0 0 calc(100% - 28px);
    width: calc(100% - 28px);
    max-width: 400px;
  }
`;

const Title = styled.div`
  display: block;
  margin: 0 0 10px;
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  opacity: 0.5;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.25);
`;

const List = styled.ul`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: block;
  width: 100%;
  margin: 0 0 18px;
  padding: 0 0 18px;
  color: #000;
  font-size: 20.284px;
  font-style: normal;
  font-weight: 400;
  line-height: 23.665px;
  border-bottom: 1px solid #d9d9d9;

  &:last-of-type {
    border: none;
    margin: 0;
  }

  @media (max-width: 576px) {
    margin: 0 0 12px;
    padding: 0 0 12px;
    font-size: 18px;
  }

  @media (max-width: 375px) {
    margin: 0 0 10px;
    padding: 0 0 10px;
    font-size: 16px;
  }
`;

const ItemLink = styled(Link)`
  display: block;
  background-color: transparent;
  width: 100%;
  padding: 8px 16px;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #00b140;
  transition: color 0.3s, background 0.3s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    @media (any-hover: hover) {
      color: #fff;
      background: #00b140;
    }
  }
`;

const AppointmentItem = ({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick && onClick();
    if (window.ym) {
      window.ym(90602537,'reachGoal',item.ymTarget)
    }
  };

  return (
    <Wrap className="reception-item">
      <Title className="reception-item__title">{item.title}</Title>

      <Body className="reception-item__block">
        {Boolean(item.list.length) && (
          <List className="reception-item__list">
            {item.list.map((listItem) => (
              <Item key={listItem} className="reception-item__desc">
                {listItem}
              </Item>
            ))}
          </List>
        )}

        <ItemLink
          to={item.route}
          className="reception-item__link"
          onClick={handleClick}
        >
          Начать
        </ItemLink>
      </Body>
    </Wrap>
  );
};

export { AppointmentItem };
