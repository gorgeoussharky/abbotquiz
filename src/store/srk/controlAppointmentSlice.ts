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

export const srkControlAppointmentSlice = createSlice({
  name: 'srkControlAppointment',
  initialState,
  reducers: {
    setSrkControlAnswer: (
      state,
      action: PayloadAction<{ id: string; option: Option }>
    ) => {
      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      if (questionIndex < 0) return 

      state.list[questionIndex].value = action.payload.option;
    },

    resetSrkControlAnswers: (state) => {
      state.list = data.map((el) => {
        return {
          ...el,
          value: undefined,
        };
      });
    },

    resetSrkControlAnswerByID: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      if (questionIndex < 0) return 

      state.list[questionIndex].value = undefined;
    },
  },
});

export const {
  setSrkControlAnswer,
  resetSrkControlAnswers,
  resetSrkControlAnswerByID
} = srkControlAppointmentSlice.actions;

export const selectSrkControlQuestions = (state: RootState) =>
  state.srkControlAppointment.list

export default srkControlAppointmentSlice.reducer;
