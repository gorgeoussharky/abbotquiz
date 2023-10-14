import { Notification } from '../../../Notification/Notification';
import { DosageList } from '../../../DosageList/DosageList';

interface Props {
  points: number;
}

const EmpyricalTherapy = ({ points }: Props) => {
  const dosage = () => {
    return [
      {
        title: 'Рабепразол',
        dosage: '20мг 1 раз в сутки',
      },
      {
        title: 'Лансопразол',
        dosage: '60 мг 1 раз в сутки',
      },
      {
        title: 'Омепразол',
        dosage: '20 мг 1 раз в сутки',
      },
      {
        title: 'Пантопразол',
        dosage: '40 мг 1 раз в сутки',
      },
      {
        title: 'Эзомепразол',
        dosage: '40 мг 1 раз в сутки',
      },
      {
        title: 'Декслансопразол',
        dosage: '60 мг 1 раз в сутки',
      },
    ];
  };

  const notifications = () => {
    const notificationsList: string[] = [];

    notificationsList.push(
      'При необходимости проведения теста на H. pylori следует воздержаться от назначения/приема ИПП (в том числе, комбинированнных препаратов) за 2 недели до теста'
    );

    if (points >= 8) {
      notificationsList.push(
        'При проведении pH-импедансометрии рекомендуется приостановить прием ИПП за 3-5 дней до проведения процедуры'
      );
    }

    return notificationsList;
  };

  return (
    <>
      <div className="quiz-block__title">Эмпирическая терапия</div>

      {points >= 8 && (
        <div className="quiz-block__text" style={{ marginBottom: 12 }}>
          Рекомендуется рассмотреть возможность назначения пациенту эмпирической
          терапии в зависимости от степени выраженности симптомов ГЭРБ.
        </div>
      )}

      <div className="quiz-block__text" style={{ marginBottom: 12 }}>
        ИПП на выбор до получения результатов диагностических исследований с
        последующей коррекцией терапии, но на срок не более 4 недель:
      </div>

      <DosageList list={dosage()} />

      <div className="quiz-block__text" style={{ marginBottom: 12 }}>
        При выборе препарата из класса ИПП рекомендуется отдавать предпочтение{' '}
        <span>рабепразолу</span>, т.к. у препарата есть:
      </div>

      <ul className="quiz-block__list">
        <li>Максимальный в классе ИПП потенциал кислотосупрессии</li>
        <li>Купирование симптомов ГЭРБ быстрее других ИПП</li>
        <li>
          Уникальный цитопротективный эффект за счет секреции слизи муцинов{' '}
        </li>
        <li>Минимальный риск межлекарственного взаимодействия</li>
      </ul>

      <div className="diagnosis-block__list">
        {notifications().map((el) => (
          <Notification content={el} />
        ))}
      </div>

      <button className="quiz-block__btn quiz-block__btn--full">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 17C14.366 17 17.5 13.866 17.5 10C17.5 6.13401 14.366 3 10.5 3C6.63401 3 3.5 6.13401 3.5 10C3.5 13.866 6.63401 17 10.5 17Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.5 21L15.5 15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Проверить межлекарственные взаимодействия
      </button>
    </>
  );
};

export { EmpyricalTherapy };
