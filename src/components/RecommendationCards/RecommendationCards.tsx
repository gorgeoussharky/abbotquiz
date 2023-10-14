import { RecommendationCard } from '../../types/interfaces';

import './RecommendationCards.scss';

interface Props {
  title: string;
  list: RecommendationCard[];
}

const RecommendationCards = ({ title, list }: Props) => {
  return (
    <div className="recommendation-cards">
      <div className="recommendation-cards__title">{title}</div>
      <ul className="recommendation-cards__list">
        {list.map((item) => (
          <li key={item.title} className="recommendation-cards__item">
            
            <div>
              <div className="recommendation-cards__item-title"  dangerouslySetInnerHTML={{__html: item.title }}/>
              {item.link && (
                <a
                  href={item.link}
                  rel="noreferrer"
                  target="_blank"
                  className="recommendation-cards__item-link"
                >
                  {item.linkLabel}
                </a>
              )}
            </div>

            {item.icon && (
              <img
                src={item.icon}
                alt={item.title}
                className="recommendation-cards__item-icon"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { RecommendationCards };
