import './DiagnosisProbability.scss';

interface Props {
    percent: number;
}

const DiagnosisProbability = ({percent}: Props) => {
  return (
    <div className="diagnosis-probability">
      <div className="diagnosis-probability__wrap">

        <div className="diagnosis-probability__text">
          Вероятность диагноза ГЭРБ
        </div>

        <div className="diagnosis-probability__percent">{percent}%</div>
      </div>
    </div>
  );
};

export { DiagnosisProbability }
