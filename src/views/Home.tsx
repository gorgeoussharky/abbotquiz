import { useEffect } from 'react';
import { ConsultBanner } from '../components/ConsultBanner';
import { ConsultInfo } from '../components/ConsultInfo';
import { useAppDispatch } from '../app/hooks';
import { clearHistory, setHasLastDiagnosis } from '../store/utilsSlice';
import { clearSelectedMedicaments } from '../store/interactionsSlice';
import { clearSelectedExaminations } from '../store/examinationsSlice';
import { clearSelectedSymptoms } from '../store/symptomsSlice';
import { resetAnswers } from '../store/gerdQQuestionsSlice';

const Home = () => {

  const dispatch = useAppDispatch()

  // Очистка стейтов
  useEffect(() => {
    dispatch(clearHistory())
    dispatch(clearSelectedMedicaments())
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
