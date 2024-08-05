import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionEntry, Option } from '../../types/interfaces';
import { RootState } from '../../app/store';

import data from './data/secondary.json'

export interface ExaminationsState {
  list: QuestionEntry[];
}

const initialState: ExaminationsState = {
  list: data
};

export const LPPSecondarySlice = createSlice({
  name: 'lpp_secondary',
  initialState,
  reducers: {

    setLPPSecondaryAnswer: (
      state,
      action: PayloadAction<{ id: string; answer: Option }>
    ) => {
      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      if (action.payload.answer.value === '[]') {
        state.list[questionIndex].value = undefined;
        return
      }

      state.list[questionIndex].value = action.payload.answer;
    },

    clearLPPSecondaryAnswer: (state, action: PayloadAction<{ id: string }>) => {
      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      state.list[questionIndex].value = undefined;
    },
  },
});

export const { setLPPSecondaryAnswer, clearLPPSecondaryAnswer } = LPPSecondarySlice.actions;

export const selectLPPSecondaryAnswers = (state: RootState) => state.lppSecondary.list;

export default LPPSecondarySlice.reducer;
