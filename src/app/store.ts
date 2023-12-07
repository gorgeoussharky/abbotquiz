import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import symptomsReducer from '../store/symptomsSlice';
import ferdQQuestionsSlice from '../store/gerdQQuestionsSlice';
import examinationsReducer from '../store/examinationsSlice';
import controlAppointmentSlice from '../store/controlAppointmentSlice';
import utilsSlice from '../store/utilsSlice';
import srkSymptomsSlice from '../store/srkSymptomsSlice';
import rim4Slice from '../store/rim4Slice';

export const store = configureStore({
  reducer: {
    symptoms: symptomsReducer,
    srkSymptoms: srkSymptomsSlice,
    gerdQQuestions: ferdQQuestionsSlice,
    examinations: examinationsReducer,
    controlAppointment: controlAppointmentSlice,
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
