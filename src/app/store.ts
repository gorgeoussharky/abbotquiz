import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import symptomsReducer from '../store/herb/symptomsSlice';
import ferdQQuestionsSlice from '../store/herb/gerdQQuestionsSlice';
import examinationsReducer from '../store/herb/examinationsSlice';
import controlAppointmentSlice from '../store/herb/controlAppointmentSlice';
import utilsSlice from '../store/utilsSlice';
import srkSymptomsSlice from '../store/srk/symptomsSlice';
import rim4Slice from '../store/srk/rim4Slice';
import srkExaminationsSlice from '../store/srk/examinationsSlice';
import srkControlAppointmentSlice from '../store/srk/controlAppointmentSlice';

export const store = configureStore({
  reducer: {
    symptoms: symptomsReducer,
    srkSymptoms: srkSymptomsSlice,
    gerdQQuestions: ferdQQuestionsSlice,
    examinations: examinationsReducer,
    srkExaminations: srkExaminationsSlice,
    controlAppointment: controlAppointmentSlice,
    srkControlAppointment: srkControlAppointmentSlice,
    utils: utilsSlice,
    rim4: rim4Slice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
