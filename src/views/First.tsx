import { useState } from 'react';
import { SymptomsBlock } from '../components/SymptomsBlock/SymptomsBlock';
import { SourcesList } from '../components/SourcesList/SourcesList';
import { QuestionsBlock } from '../components/QuestionsBlock/QuestionsBlock';

const totalSteps = 3;

const First = () => {
  const [step, setStep] = useState(1);

  const stepTitle = () => {
    switch (step) {
      case 1:
        return 'Шаг 1: Сбор симптомов';
      case 2:
        return 'Шаг 2: Уточняющие вопросы';
        case 3:
          return 'Шаг 2: Уточняющие вопросы';
    }
  };

  const progress = () => {
    return `${Math.round((step / totalSteps) * 100)}%`;
  };

  return (
    <div className="container">
      <div className="quiz__card">
        <div className="quiz__head">
          <div className="quiz__head-label">{stepTitle()}</div>
          <div className="quiz__percent">{progress()}</div>
          <div className="quiz__progress">
            <span style={{ width: progress() }}></span>
          </div>
        </div>

        {step === 1 && <SymptomsBlock onNext={() => setStep(2)} />}
        {step === 2 && <QuestionsBlock onNext={() => setStep(2)} />}
      </div>

      <div className="gastro-calculator-btn-wrap">
        <SourcesList />
      </div>
    </div>
  );
};

export { First };
