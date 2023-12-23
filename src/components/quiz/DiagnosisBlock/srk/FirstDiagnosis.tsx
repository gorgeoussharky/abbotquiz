import { selectSrkSelectedSymptoms } from '../../../../store/srk/symptomsSlice';
import { useAppSelector } from '../../../../app/hooks';
import { LowProb } from './first/LowProb';
import { HighProb } from './first/HighProb';
import { selectRim4Questions } from '../../../../store/srk/rim4Slice';

interface Props {
  onBack: () => void;
}

const FirstSrkDiagnosis = ({ onBack }: Props) => {
  const srkSymptoms = useAppSelector(selectSrkSelectedSymptoms);
  const rim4 = useAppSelector(selectRim4Questions)

  const isLowProb = () => {
    const srkTypes = ['Боль в животе', 'Диарея', 'Запор']

    // В тесте РИМ IV первые два вопроса - нет
    const hasStomachAche = rim4.find(el => el.id === 'recid_stomach_ache')?.value?.value
    const isLong = rim4.find(el => el.id === 'last_8_weeks')?.value?.value

    if (!isLong && !hasStomachAche) return true

    // Поиск по соотвествующим группам и подсчет количества подходящих симптомов
    return !srkSymptoms.filter(el => {
      return srkTypes.some(type => el.type === type)
    }).length
  }

  if (isLowProb()) {
    return <LowProb onBack={onBack} />
  }

  return <HighProb onBack={onBack} />

};

export { FirstSrkDiagnosis };
