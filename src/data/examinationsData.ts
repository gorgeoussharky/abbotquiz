import egdsIcon from '../assets/img/egds.png'
import manometryIcon from '../assets/img/manometry.png'
import phImpedanceIcon from '../assets/img/phImpedance.png'
import scheduleIcon from '../assets/img/schedule.png'

const examinations = {
    egds: {
        title: 'ЭГДС',
        link: '',
        linkLabel: 'Памятка для пациента',
        icon: egdsIcon
    },
    manometry: {
        title: 'Манометрия высокого разрешения',
        link: '',
        linkLabel: 'Памятка для пациента',
        icon: manometryIcon
    },
    phImpedance: {
        title: 'Суточная pH-импедансометрия',
        icon: phImpedanceIcon
    },
    schedule: {
        title: 'Назначить повторный прием после проведения терапии',
        icon: scheduleIcon
    }
}

export const { egds, manometry, phImpedance, schedule } = examinations