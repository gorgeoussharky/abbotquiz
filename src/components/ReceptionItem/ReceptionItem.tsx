import { Link } from "react-router-dom";

import './ReceptionItem.scss'

interface ReceptionItemType {
  title: string;
  list: string[];
  route: string;
}

interface Props {
  item: ReceptionItemType;
  onClick?: () => void;
}

const ReceptionItem = ({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div  className="reception-item">
      <div className="reception-item__title">
        {item.title}
      </div>

      <div className="reception-item__block">

        {Boolean(item.list.length) && (
          <div className="reception-item__list">

            {item.list.map((listItem) => (
              <div key={listItem} className="reception-item__desc">
                {listItem}
              </div>
            ))}

          </div>
        )}

        <Link
        to={item.route}
          className="reception-item__link"
          onClick={handleClick}
        >
          Начать
        </Link>
      </div>
    </div>
  );
};

export { ReceptionItem };
