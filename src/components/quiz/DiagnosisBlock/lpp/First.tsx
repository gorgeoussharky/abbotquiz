import { useAppSelector } from '../../../../app/hooks';
import { LowProb } from './first/LowProb';
import { selectLPPType } from '../../../../store/lpp/lppTypeSlice';
import { HighProb } from './first/HighProb';

interface Props {
  onBack: () => void;
}

const FirstLPPDiagnosis = ({ onBack }: Props) => {
  const answers = useAppSelector(selectLPPType);

  const isLowProb = () => {
    // Проверка на превышение ГГТ
    const isHightGGT = () => {
      const base = answers.find(el => el.id === 'ggt')?.value_base || 0
      const max = answers.find(el => el.id === 'ggt')?.value_max || 0

      return base > max
    }

    // Проверка на превышение билирубина
    const isHighBili = () => {
      const base = answers.find(el => el.id === 'bili')?.value_base || 0
      const max = answers.find(el => el.id === 'bili')?.value_max || 0

      return base > max
    }

    // Проверка на превышение прямого билирубина
    const isHighDirectBili = () => {
      const base = answers.find(el => el.id === 'direct_bili')?.value_base || 0
      const max = answers.find(el => el.id === 'direct_bili')?.value_max || 0

      return base > max
    }

    // Проверка на превышение АСТ в два раза
    const isHighAST = () => {
      const base = answers.find(el => el.id === 'ast')?.value_base || 0
      const max = answers.find(el => el.id === 'ast')?.value_max || 0

      return base > max * 2
    }

    // Проверка на превышение АЛТ в два раза
    const isHighALT = () => {
      const base = answers.find(el => el.id === 'alt')?.value_base || 0
      const max = answers.find(el => el.id === 'alt')?.value_max || 0

      return base > max * 2
    }


    const highBili = isHighBili() || isHighDirectBili()

    // Повышен ТОЛЬКО уровень ГГТ, остальное - без отклонений - ЛПП маловероятен
    if (isHightGGT() && !isHighALT() && !isHighAST() && !highBili) {
      return true;
    }

    // Повышен ТОЛЬКО билирубин общий/билирубин прямой, остальное - без отклонений
    if (highBili && !isHighALT() && !isHighAST() && !isHightGGT()) {
      return true;
    }

    // АСТ повышен менее, чем в 2 раза
    if (!isHighAST()) {
      return true;
    }

    // АЛТ повышен менее, чем в 2 раза
    if (!isHighALT()) {
      return true;
    }

    return false
  }

  if (isLowProb()) {
    return <LowProb onBack={onBack} />
  }

  return <HighProb onBack={onBack} />

};

export { FirstLPPDiagnosis };
