import { RecommendationCards } from '../../../RecommendationCards/RecommendationCards';
import { RecommendationCard } from '../../../../types/interfaces'
import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedSymptoms } from '../../../../features/symptoms/symptomsSlice';

import {
    egds,
    manometry,
    phImpedance,
    schedule,
  } from '../../../../data/examinationsData';
  import doctorIcon from '../../../../assets/img/doctor.png';
import { Notification } from '../../../Notification/Notification';

interface Props {
  points: number;
}

const RecommendedExaminations = ({ points }: Props) => {
    const selectedSymptoms = useAppSelector(selectSelectedSymptoms);

  const baseExaminations = () => {
    const exams: RecommendationCard[] = [];

    exams.push(egds);

    if (points > 3 && points < 8) {
      exams.push(manometry);
    }

    if (points >= 8) {
      exams.push(phImpedance);
    }

    return exams;
  };

  const optionalExaminations = () => {
    const exams: RecommendationCard[] = [];

    if (points > 3 && points < 8) {
      exams.push(phImpedance);
    }

    if (points >= 8) {
      exams.push(manometry);
    }

    return exams;
  };

  const additionalExaminations = () => {
    const exams: RecommendationCard[] = [];

    exams.push(schedule);

    const extraesophagealCount = selectedSymptoms.filter(
      (el) => el.type === 'Внепищеводные'
    );

    extraesophagealCount.forEach((symptom) => {
      exams.push({
        title: `Учитывая наличие у пациента <span>${symptom.title}</span>, с целью исключения сопутствующей патологии, рекомендуется направить пациента на консультацию к следующему специалисту: <span>${symptom.doctors}</span>`,
        icon: doctorIcon,
      });
    });

    return exams;
  };

  const notifications = () => {
    const notifications: string[] = [];
    if (points > 3 && points < 8) {
      notifications.push(
        'Учитывая наличие у пациента <b>дисфагии</b>, проведение манометрии высокого разрешения или рентгеноскопии пищевода и желудка с сульфатом бария является обязательным'
      );
    }

    if (points >= 8) {
      notifications.push(
        'Учитывая наличие у пациента внепищеводных проявлений ГЭРБ, проведение pH-импедансометрии является обязательным'
      );
    }

    notifications.push(
      'Необходимо провести лабораторные исследования: тест на инфекцию H.pylori (С13 уреазный дыхательный тест или определение антигена H.pylori в кале); анализ кала на скрытую кровь. Для исключения заболеваний сердца обязательным исследованием является проведение ЭКГ.'
    );
    return notifications;
  };

  return (
    <>
      <div className="quiz-block__head">
        <div className="quiz-block__title">Рекомендуемый план обследования</div>

        <div className="quiz-block__text" style={{ margin: 0 }}>
          В соответствии с наблюдаемыми у пациента симптомами и степенью их
          выраженности рекомендован следующий план обследований
        </div>
      </div>

      <div className="diagnosis-block__list">
        <RecommendationCards
          title="Базовые обследования"
          list={baseExaminations()}
        />
        {notifications().map((el) => (
          <Notification content={el} />
        ))}
      </div>

      <div className="diagnosis-block__list">
        <RecommendationCards
          title="Факультативные обследования"
          list={optionalExaminations()}
        />
      </div>

      <RecommendationCards
        title="Дополнительно"
        list={additionalExaminations()}
      />
    </>
  );
};

export { RecommendedExaminations };
