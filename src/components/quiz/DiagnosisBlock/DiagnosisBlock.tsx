import { useLocation } from 'react-router-dom';
import { FirstDiagnosis } from './components/FirstDiagnosis';
import { SecondaryDiagnosis } from './components/SecondaryDiagnosis';
import { ControlDiagnosis } from './components/ControlDiagnosis';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setHasLastDiagnosis } from '../../../store/utilsSlice';
interface Props {
  onBack: () => void;
}

const DiagnosisBlock = ({ onBack }: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Для возврана на диагноз с межлека (только для первичного и повторного)
    if (location.pathname !== '/control') {
      dispatch(setHasLastDiagnosis(true))
    }
  }, [])

  if (location.pathname === '/first') {
    return <FirstDiagnosis onBack={onBack} />;
  }

  if (location.pathname === '/secondary') {
    return <SecondaryDiagnosis onBack={onBack} />;
  }

  if (location.pathname === '/control') {
    return <ControlDiagnosis onBack={onBack} />;
  }

  return <></>
};

export { DiagnosisBlock };
