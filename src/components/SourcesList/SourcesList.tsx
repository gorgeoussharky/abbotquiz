import { useState } from 'react';
import './SourcesList.scss'

import sources from '../../data/sources.json'

const SourcesList = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sources-list">
      <button className="sources-list__button btn-reset" onClick={() => setExpanded(!expanded)}>
        <span>Ключевые источники информации</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          transform={`rotate(${expanded ? -90 : 0})`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.89164 2.73051C5.19205 2.42487 5.67909 2.42487 5.9795 2.73051L11.1077 7.94791C11.252 8.09467 11.333 8.29373 11.333 8.5013C11.333 8.70885 11.252 8.90791 11.1077 9.05469L5.9795 14.2721C5.67909 14.5777 5.19205 14.5777 4.89164 14.2721C4.59124 13.9664 4.59124 13.4709 4.89164 13.1653L9.47593 8.5013L4.89164 3.83729C4.59124 3.53166 4.59124 3.03614 4.89164 2.73051Z"
            fill="#009CDE"
          ></path>
        </svg>
      </button>
      {expanded && (
        <div className="sources-list__content">
          <ol className="sources-list__list">
            {sources.map((item, index) => (
              <li key={index} className="sources-list__item">{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export { SourcesList }