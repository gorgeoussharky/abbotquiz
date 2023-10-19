import { useLocation } from 'react-router-dom';

import './DiagnosisBlock.scss';
import { FirstDiagnosis } from './components/FirstDiagnosis';
import { SecondaryDiagnosis } from './components/SecondaryDiagnosis';

interface Props {
  onBack: () => void;
}

const DiagnosisBlock = ({ onBack }: Props) => {
  const location = useLocation();

  if (location.pathname === '/first') {
    return <FirstDiagnosis onBack={onBack} />;
  }

  if (location.pathname === '/secondary') {
    return <SecondaryDiagnosis onBack={onBack} />;
  }

  return <></>
};

export { DiagnosisBlock };
