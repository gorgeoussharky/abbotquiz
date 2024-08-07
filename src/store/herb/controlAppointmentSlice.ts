import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option, QuestionEntry } from '../../types/interfaces';
import { RootState } from '../../app/store';

import data from './data/controlAppointmentData.json';

export interface ControlAppointmentState {
  list: QuestionEntry[];
}

const initialState: ControlAppointmentState = {
  list: Object.values(data),
};

export const controlAppointmentSlice = createSlice({
  name: 'controlAppointment',
  initialState,
  reducers: {
    setControlAnswer: (
      state,
      action: PayloadAction<{ id: string; option: Option }>
    ) => {
      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      if (questionIndex < 0) return;

      state.list[questionIndex].value = action.payload.option;
    },

    resetControlAnswers: (state) => {
      state.list = data.map((el) => {
        return {
          ...el,
          value: undefined,
        };
      });
    },

    resetControlAnswerByID: (state, action: PayloadAction<{ id: string }>) => {
      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      if (questionIndex < 0) return;

      state.list[questionIndex].value = undefined;
    },
  },
});

export const { setControlAnswer, resetControlAnswers, resetControlAnswerByID } =
  controlAppointmentSlice.actions;

export const selectControlQuestions = (state: RootState) =>
  state.controlAppointment.list;

export default controlAppointmentSlice.reducer;
