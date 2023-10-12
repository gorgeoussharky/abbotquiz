import { ReceptionItem } from '../ReceptionItem/ReceptionItem';
import { SourcesList } from '../SourcesList/SourcesList';

import './ConsultInfo.scss'

const items = [
    {
        title: 'Первичный прием',
        list: [
            'Анализ жалоб', 'План обследования', 'Предварительный диагноз', 'Эмпирическая терапия',
        ],
        route: '/first'
    },    {
        title: 'Повторный прием',
        list: [
            'Интерпретация результатов обследования', 'Подтверждение диагноза', 'Планирование терапии'
        ],
        route: '/second'
    },
    {
        title: 'Контрольный прием',
        list: [
            'Оценка эффективности терапии', 'Депрескрайбинг*', 'Преодоление рефрактерности'
        ],
        route: '/third'
    }
]

const ConsultInfo = () => {
  return (
    <section className="consult-info">
      <div className="consult-info__container">
        <div className="consult-info__reception">
          <div className="consult-info__reception__title">
            Гастроэзофагеальная рефлюксная болезнь (ГЭРБ)
          </div>
          <div className="consult-info__reception__desc">
            Выберите прием и нажмите кнопку “начать”, чтобы смоделировать
            клинический случай и получить экспертную консультацию по ведению
            вашего пациента
          </div>
          <div className="consult-info__reception__items">
            {items.map(item =>  <ReceptionItem key={item.title} item={item} /> )}
          </div>
        </div>

        <div className="consult-info__help">
          <div className="consult-info__help__title">
            Чем поможет цифровой консультант
          </div>
          <ul className="consult-info__help__list">
            <li className="consult-info__help__list__item">
              Подбор фармакотерапии
            </li>
            <li className="consult-info__help__list__item">
              Проверка межлекарственных взаимодействий
            </li>
            <li className="consult-info__help__list__item">
              Дифференциальная диагностика
            </li>
            <li className="consult-info__help__list__item">
              Интерпретация результатов диагностики
            </li>
          </ul>
        </div>

        <SourcesList />
    
        <div className="consult-info__desc">
          *Депрескрайбинг - это процесс снижения дозировки, приостановки приема
          или полной отмены лекарственного препарата с целью снижения
          полипрагмазии и улучшения результатов лечения.
        </div>
      </div>
    </section>
  );
};

export { ConsultInfo }
