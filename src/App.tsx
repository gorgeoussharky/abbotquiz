import { Routes, Route } from "react-router-dom";
import { Home } from './views/Home';
import { First } from "./views/First";
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { resetAnswers } from "./features/questions/questionsSlice";
import { clearSelectedSymptoms } from "./features/symptoms/symptomsSlice";

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(resetAnswers())
    dispatch(clearSelectedSymptoms())
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/first" element={<First />} />
    </Routes>
  );
}

export default App;
