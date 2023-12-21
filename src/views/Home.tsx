import { useEffect } from 'react';
import { ConsultBanner } from '../components/ConsultBanner';
import { ConsultInfo } from '../components/ConsultInfo';
import { useAppDispatch } from '../app/hooks';
import { clearHistory, setHasLastDiagnosis } from '../store/utilsSlice';
import { clearSelectedExaminations } from '../store/herb/examinationsSlice';
import { clearSelectedSymptoms } from '../store/herb/symptomsSlice';
import { resetAnswers } from '../store/herb/gerdQQuestionsSlice';

const Home = () => {

  const dispatch = useAppDispatch()

  // Очистка стейтов
  useEffect(() => {
    dispatch(clearHistory())
    dispatch(clearSelectedExaminations())
    dispatch(clearSelectedSymptoms())
    dispatch(resetAnswers())
    dispatch(setHasLastDiagnosis(false))
  }, [])

  return (
    <>
      <ConsultBanner />
      <ConsultInfo />
    </>
  );
};

export { Home}
