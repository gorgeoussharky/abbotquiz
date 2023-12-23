import { useAppSelector } from '../../../../app/hooks';
import { NoData } from './secondary/NoData';
import { selectSrkExaminations } from '../../../../store/srk/examinationsSlice';
import { Interpretation } from './secondary/Interpretation';
import { useMemo } from 'react';
import { Srk } from './secondary/Srk';
import { diseasesList, notificationsList } from './secondary/diseases';

interface Props {
  onBack: () => void;
  onFamiliarize: () => void;
}

const SecondarySrkDiagnosis = ({ onBack, onFamiliarize }: Props) => {
  const questions = useAppSelector(selectSrkExaminations);

  const diseases = useMemo(diseasesList, [questions]);
  const notifications = useMemo(notificationsList, [questions]);

  const bsfkAnswer = useMemo(
    () => questions.find((el) => el.group === 'bsfk')?.value?.value,
    [questions]
  );

  const isNoData = () => {
    // Не выбраны исследования
    return !questions.filter((el) => {
      if (!el.value) return false;

      // Проверка на множественное значение
      try {
        return Boolean(JSON.parse(el.value?.value as string).length);
      } catch (e) {
        return Boolean(el.value.value);
      }
    }).length;
  };
  
  if (bsfkAnswer) {
    return <Srk onBack={onBack} />;
  }

  if (isNoData()) {
    return <NoData onBack={onBack} />;
  }

  if (diseases.length || notifications.length) {
    return <Interpretation onFamiliarize={onFamiliarize} onBack={onBack}/>
  }

  return <></>
};

export { SecondarySrkDiagnosis };
