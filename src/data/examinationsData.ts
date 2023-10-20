import egdsIcon from '../assets/img/egds.png';
import manometryIcon from '../assets/img/manometry.png';
import phImpedanceIcon from '../assets/img/phImpedance.png';
import rentgenIcon from '../assets/img/rentgen.png';

const examinations = {
  egds: {
    title: 'ЭГДС',
    link: '/pdf/egds.pdf',
    linkLabel: 'Памятка для пациента',
    icon: egdsIcon,
    questions: [
      {
        title:
          'В ходе ЭГДС выявлены признаки повреждения слизистой оболочки пищевода?',
        type: 'radio',
        options: [
          {
            label: 'Да',
            value: 1,
          },
          {
            label: 'Нет',
            value: 0,
          },
        ],
      },
      {
        title: 'Обнаружены стриктуры пищевода?',
        type: 'radio',
        warning: {
            text: 'Рассмотреть возможность оперативного лечения',
            condition: 1,
        },
        options: [
          {
            label: 'Да',
            value: 1,
          },
          {
            label: 'Нет',
            value: 0,
          },
        ],
      },
      {
        title: 'Обнаружены признаки аденокарциномы пищевода?',
        type: 'radio',
        warning: {
            text: 'Необходима консультация онколога',
            condition: 1,
        },
        options: [
          {
            label: 'Да',
            value: 1,
          },
          {
            label: 'Нет',
            value: 0,
          },
        ],
      },
      {
        title: 'Обнаружены признаки пищевода Барретта?',
        type: 'radio',
        options: [
          {
            label: 'Да',
            value: 1,
          },
          {
            label: 'Нет',
            value: 0,
          },
        ],
      },
      {
        title: 'Обнаружены признаки пищевода Барретта?',
        type: 'radio',
        options: [
          {
            label: 'Да',
            value: 1,
          },
          {
            label: 'Нет',
            value: 0,
          },
        ],
      },
      {
        title: 'Участки повреждения слизистой оболочки:',
        type: 'radio',
        options: [
          {
            label: `<b>Размером до 5 мм</b>, расположены на вершине складок (не затрагивают ткани внутри складки).<br><br>
            Эрозивный эзофагит степени А, согласно Лос-Анджелесской классификации.`,
            value: 'A',
          },
          {
            label: `<b>Размером более 5 мм</b>, расположены на вершине складок (не затрагивают ткани внутри складки).<br><br>
            Эрозивный эзофагит степени В, согласно Лос-Анджелесской классификации.`,
            value: 'B',
          },
          {
            label: `Затрагивает ткани между двумя и более складками, но вовлекает <b>менее 75%</b> окружности пищевода.<br><br>
            Эрозивный эзофагит степени С, согласно Лос-Анджелесской классификации.`,
            value: 'C',
          },
          {
            label: `Вовлекает <b>более 75%</b> окружности пищевода.<br><br>
            Эрозивный эзофагит степени D, согласно Лос-Анджелесской классификации.`,
            value: 'D',
          },          
        ],
      },
      {
        title: 'Есть признаки грыжи пищеводного отверстия диафрагмы',
        type: 'checkbox',
        value: {
          label: 'Есть признаки грыжи пищеводного отверстия диафрагмы',
          value: false
        }
      },
      {
        title: 'Пациента беспокоят ночные симптомы',
        type: 'checkbox',
        value: {
          label: 'Пациента беспокоят ночные симптомы',
          value: false
        }
      },
    ],
  },
  manometry: {
    title: 'Манометрия высокого разрешения',
    link: '/pdf/manometry.pdf',
    linkLabel: 'Памятка для пациента',
    icon: manometryIcon,
    questions: [
      {
        title: 'Значение суммарного давления расслабления (IRP)',
        type: 'radio',
        options: [
          {
            label: '>15 мм рт ст',
            value: '>15',
          },
          {
            label: '<15 мм рт ст',
            value: '<15',
          },
        ],
      },
      {
        title: 'Оценка перистальтической активности',
        type: 'radio',
        options: [
          {
            label: 'Перистальтика отсутствует',
            value: 0,
          },
          {
            label: 'Перистальтика снижена или в норме',
            value: 1,
          },
        ],
      },
      {
        title: 'Оценка перистальтической активности (детальная)',
        type: 'radio',
        options: [
          {
            label: 'Отсутствие сокращений пищевода в 100% глотков (перистальтика отсутствует)) (ИСДС <100 мм рт. ст.)',
            value: '1',
          },
          {
            label: 'Время латентного периода дистального сегмента пищевода (DL) <4,5 сек, может сопровождаться незавершенным транзитом болюса',
            value: '2',
          },
          {
            label: 'Интегральная сократимость дистального сегмента пищевода (DCI) >8000 мм рт. ст. X с X см в 20% и более глотков',
            value: '3',
          },
          {
            label: 'Неэффективные сокращения пищевода в ≥ 70% глотков с ИСДС <450 мм рт. ст. х с х см или 50% глотков отсутствуют',
            value: '4',
          },
          {
            label: 'Увеличение длины разрыва сокращения стенки пищевода (фрагментированное сокращение) > 5 см в ≥ 50% глотков с ИСДС > 450 мм рт. ст. х с х см',
            value: '5',
          },
          {
            label: 'Перистальтика в норме',
            value: '6',
          },
        ],
      },
    ]
  },
  phImpedance: {
    title: 'Суточная pH-импедансометрия',
    link: '/pdf/ph.pdf',
    linkLabel: 'Памятка для пациента',
    icon: phImpedanceIcon,
    questions: [
      {
        title: 'Процент времени, в течение которого pH был <4',
        type: 'radio',
        options: [
          {
            label: 'Менее 4%',
            value: '<4%',
          },
          {
            label: 'От 4% до 6%',
            value: '<6%',
          },
          {
            label: 'Более 6%',
            value: '>6%',
          },
        ],
      },
      {
        title: 'Индекс симптома (ИС) > 50%?',
        type: 'radio',
        options: [
          {
            label: 'Да',
            value: 1,
          },
          {
            label: 'Нет',
            value: 0,
          },
        ],
      },
      {
        title: 'Количество эпизодов рефлюкса в течение исследования?',
        type: 'radio',
        options: [
          {
            label: '< 80',
            value: '< 80',
          },
          {
            label: '> 80',
            value: '> 80',
          },
        ],
      },
    ],
  },
  rentgenometry: {
    title: 'Рентгеноскопия пищевода и желудка с сульфатом бария',
    link: '/pdf/rentgen.pdf',
    linkLabel: 'Памятка для пациента',
    icon: rentgenIcon,
    questions: [
      {
        title: 'Рентгеноскопия пищевода и желудка с сульфатом бария',
        type: 'radioList',
        options: [
          {
            label: 
              `Наличие уровня жидкости и воздуха в пустом пищевода|
              Отсутствие газового пузыря желудка|
              Отсутствие первичной перистальтики|
              Третичные сокращения пищевода|
              Медленное опорожнение пищевода|
              Может наблюдаться расширение просвета пищевода и его S-образная деформация|
              Сужение на уровне пищеводно-желудочного перехода (симптом птичьего клюва)`
            ,
            value: '1',
          },
          {
            label: 
              `Периодически возникающие нескоординированные спастические сокращения пищевода|
              Нормальный тонус нижнего пищеводного сфинктера сохранен, раскрывается рефлекторно во время глотания|
              Могут наблюдаться деформации в виде «чёток», «штопора», псевдодивертикулов`
            ,
            value: '2',
          },
          {
            label: 
              `Желудочные складки обнаруживаются в проекции пищеводного отверстия диафрагмы|
              Грыжевая часть желудка образует выпячивание округлой формы, которое широко сообщается с поддиафрагмальной частью желудка|
              Косвенные признаки грыж ПОД: малый размер газового пузыря и искривление наддиафрагмального отдела пищевода`
            ,
            value: '3',
          },
        ],
      },
    ]
  },
};

export const { egds, manometry, phImpedance, rentgenometry } = examinations;
export default examinations;
