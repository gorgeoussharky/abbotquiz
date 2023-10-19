import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedSymptoms } from '../../../store/symptomsSlice';
import { Recommendations } from '../../Recommendations/Recommendations';

interface Props {
  onBack: () => void;
}

const RecommendationsBlock = ({ onBack }: Props) => {
  const symptoms = useAppSelector(selectSelectedSymptoms);

  const extraesophagealSymptoms = () => {
    return symptoms.filter((el) => el.type === 'Внепищеводные');
  };

  const generateText = (title: string, doctors: string) => {
    return `Учитывая наличие у пациента <span>${title}</span> с целью исключения
    сопутствующей патологии рекомендуется направить пациента на
    консультацию к следующему (-им) специалисту (-ам): <span>${doctors}</span>`;
  };

  return (
    <div className="quiz-block">
      <button className="quiz-block__back" onClick={onBack}>
        Назад
      </button>

      <div className="quiz-block__title">Результаты диагностики</div>

      <Recommendations
        className="quiz-block__recommendations-list"
        list={extraesophagealSymptoms().map((el) =>
          generateText(el.title, el.doctors)
        )}
      />

      <div className="quiz-block__foot quiz-block__foot--end">
        <Link to="/" className="quiz-block__btn quiz-block__btn--light">
          Закончить прием
        </Link>
      </div>
    </div>
  );
};

export { RecommendationsBlock };
