import { Option } from '../../../types/interfaces'

import './PopularList.scss';

interface Props {
  list: Option[],
  onSelect?: (val: Option) => void
}

const PopularList = ({list, onSelect}: Props) => {
  return (
    <div className="popular-list">
      <div className="popular-list__title">Часто ищут</div>
      <ul className="popular-list__list">
        {list
          .map((el) => (
            <li className="popular-list__item">
              <button
                className="popular-list__item-btn"
                onClick={() => onSelect && onSelect(el)}
              >
                {el.label}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { PopularList };
