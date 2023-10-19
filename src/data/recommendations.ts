import scheduleIcon from '../assets/img/schedule.png';
import drugsIcon from '../assets/img/drugs.png';
import lifestyleIcon from '../assets/img/lifestyle.png';
import doctorIcon from '../assets/img/doctor.png';
import dilatationIcon from '../assets/img/dilatation.png';
import surgicalIcon from '../assets/img/surgical.png'
import foodIcon from '../assets/img/food.png';
import egdsIcon from '../assets/img/egds.png'
import complexIcon from '../assets/img/search.png'
import needleIcon from '../assets/img/needle.png'


const examinations = {
  schedule: {
    title: 'Назначить повторный прием после проведения терапии',
    icon: scheduleIcon,
  },
  drugs: {
    title: 'Медикаментозная терапия',
    icon: drugsIcon,
  },
  lifestyle: {
    title: 'Модификация пищевого поведения и образа жизни',
    linkLabel: 'Подробнее',
    link: '/pdf/lifestyle.pdf',
    linkHasArrow: true,
    icon: lifestyleIcon,
  },
  peroralTherapy:{
    title: 'Пероральная медикаментозная терапия в преоперационном периоде или при наличие противопоказаний к хирургическому лечению',
    icon: drugsIcon,
  },
  dilatation: {
    title: 'Пневматическая дилатация',
    icon: dilatationIcon,
  },
  surgical: {
    title: 'Хирургическое лечение',
    icon: surgicalIcon,
  },
  consultations:{
    title: 'Дополнительно',
    icon: doctorIcon,
  },
  visit: {
    title: 'Направление пациента на визит в профильный центр',
    icon: doctorIcon
  },
  food: {
    title: 'Модификация пищевого поведения',
    icon: foodIcon
  },
  lowPeristalic: {
    title: 'Исключение факторов ослабления перистальтики ',
    icon: egdsIcon
  },
  complex: {
    title: 'Проведение комплексного обследования с целью исключения заболеваний, проявляющихся ослаблением перистальтики ',
    icon: complexIcon
  },
  alternative: {
    title: 'Алтеранативная медицина (в редких случаях)',
    icon: needleIcon
  }
  
  
};

export const { consultations, lifestyle, schedule, drugs, peroralTherapy, dilatation, surgical, visit, food, lowPeristalic, complex, alternative } = examinations;
export default examinations;

  