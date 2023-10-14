import './Recommendations.scss';

interface Props {
  list: string[];
  className?: string;
}

const Recommendations = ({ list, className }: Props) => {
  return (
    <div className={`recommendations ${className || ''}`}>
      <ul className="recommendations__list">
        {list.map((el, index) => (
          <li
            key={index}
            className="recommendations__item"
            dangerouslySetInnerHTML={{ __html: el }}
          />
        ))}
      </ul>
    </div>
  );
};

export { Recommendations };
