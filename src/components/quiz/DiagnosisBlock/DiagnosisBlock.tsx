import { useLocation } from 'react-router-dom';
import { FirstDiagnosis } from './herb/FirstDiagnosis';
import { SecondaryDiagnosis } from './herb/SecondaryDiagnosis';
import { ControlDiagnosis } from './herb/ControlDiagnosis';
import { FirstSrkDiagnosis } from './srk/FirstDiagnosis';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setHasLastDiagnosis } from '../../../store/utilsSlice';
import { SecondarySrkDiagnosis } from './srk/SecondaryDiagnosis';
import { ControlSrkDiagnosis } from './srk/ControlDiagnosis';
import { FirstLPPDiagnosis } from './lpp/First';
interface Props {
  onBack: () => void;
  onFamiliarize?: () => void;
}

const DiagnosisBlock = ({ onBack, onFamiliarize }: Props) => {
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

  if (location.pathname === '/srk/first') {
    return <FirstSrkDiagnosis onBack={onBack} />;
  }

  if (location.pathname === '/srk/secondary') {
    return <SecondarySrkDiagnosis onFamiliarize={() => onFamiliarize && onFamiliarize()} onBack={onBack} />;
  }
  
  if (location.pathname === '/srk/control') {
    return <ControlSrkDiagnosis onBack={onBack} />;
  }

  if (location.pathname === '/lpp/first') {
    return <FirstLPPDiagnosis onBack={onBack} />;
  }

  return <></>
};

export { DiagnosisBlock };
