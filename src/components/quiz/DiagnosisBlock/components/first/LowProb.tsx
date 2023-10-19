import { Link } from "react-router-dom";
import { Recommendations } from "../../../../Recommendations/Recommendations";

interface Props {
    onBack: () => void;
}

const LowProb = ({onBack}: Props) => {
    return (
        <div className="quiz-block">
          <button className="quiz-block__back" onClick={onBack}>
            Назад
          </button>
  
          <div className="quiz-block__title">Результаты диагностики</div>
  
          <Recommendations
            list={[
              '<span>Диагноз ГЭРБ маловероятен.</span><br>Рекомендовано продолжить диагностический поиск в других нозологиях',
            ]}
          />
  
          <div className="quiz-block__foot quiz-block__foot--end">
            <Link to="/" className="quiz-block__btn">
              Закончить прием
            </Link>
          </div>
        </div>
      );
}

export { LowProb }