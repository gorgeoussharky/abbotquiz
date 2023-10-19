import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import symptomsReducer from '../store/symptomsSlice';
import questionsReducer from '../store/questionsSlice';
import examinationsReducer from '../store/examinationsSlice';

export const store = configureStore({
  reducer: {
    symptoms: symptomsReducer,
    questions: questionsReducer,
    examinations: examinationsReducer,
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
