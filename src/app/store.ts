import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import symptomsReducer from '../store/symptomsSlice';
import ferdQQuestionsSlice from '../store/gerdQQuestionsSlice';
import examinationsReducer from '../store/examinationsSlice';
import controlAppointmentSlice from '../store/controlAppointmentSlice';
import interactionsSlice from '../store/interactionsSlice';
import utilsSlice from '../store/utilsSlice';

export const store = configureStore({
  reducer: {
    symptoms: symptomsReducer,
    gerdQQuestions: ferdQQuestionsSlice,
    examinations: examinationsReducer,
    controlAppointment: controlAppointmentSlice,
    interactions: interactionsSlice,
    utils: utilsSlice
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
