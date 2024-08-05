import { Link } from 'react-router-dom';

import styled from 'styled-components';

interface AppointmentItemType {
  title: string;
  list?: string[];
  route?: string;
  routes?: { title: string; route: string; ymTarget?: string }[];
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

const Body = styled.div<{ $transparent?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.25);

  ${(props) => props.$transparent && 'background: rgba(255, 255, 255, 0.7);'}
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

const RoutesList = styled.ul`
  display: grid;
  width: 100%;
  padding: 0;
  gap: 18px;
  margin: 0;
`;

const RouteItem = styled(Link)`
  border-radius: 20px;
  padding: 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  text-decoration: none;
  background-color: #fff;

  @media (max-width: 576px) {
    padding: 16px;
    font-size: 18px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const AppointmentItem = ({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick && onClick();
    if (window.ym) {
      window.ym(90602537, 'reachGoal', item.ymTarget);
    }
  };

  return (
    <Wrap className="reception-item">
      <Title className="reception-item__title">{item.title}</Title>

      <Body
        className="reception-item__block"
        $transparent={Boolean(item.routes?.length)}
      >
        {item.list?.length && (
          <List className="reception-item__list">
            {item.list?.map((listItem) => (
              <Item key={listItem} className="reception-item__desc">
                {listItem}
              </Item>
            ))}
          </List>
        )}

        {item.routes?.length && (
          <RoutesList>
            {item.routes?.map((route) => (
              <RouteItem key={route.route} to={route.route}>
                {route.title}
                <svg
                  width="10"
                  height="15"
                  viewBox="0 0 10 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.999998 0.500056C0.4477 1.05235 0.4477 1.94775 0.999998 2.50005L5.99998 7.50003L1 12.5C0.447705 13.0523 0.447705 13.9477 1 14.5C1.5523 15.0523 2.4477 15.0523 3 14.5L8.99997 8.50003C9.55227 7.94773 9.55227 7.05233 8.99997 6.50004L2.99999 0.500057C2.44769 -0.0522415 1.55229 -0.0522415 0.999998 0.500056Z"
                    fill="black"
                  />
                </svg>
              </RouteItem>
            ))}
          </RoutesList>
        )}

        {item.route && (
          <ItemLink
            to={item.route}
            className="reception-item__link"
            onClick={handleClick}
          >
            Начать
          </ItemLink>
        )}
      </Body>
    </Wrap>
  );
};

export { AppointmentItem };
