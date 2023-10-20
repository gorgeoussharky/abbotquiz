
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option, QuestionEntry } from '../types/interfaces';
import { RootState } from '../app/store';

import questions from '../data/gerdQData.json';

export interface GerdQQuestionsState {
  list: QuestionEntry[];
}

const initialState: GerdQQuestionsState = {
  list: questions.map((el) => {
    return {
      ...el,
      value: undefined,
    };
  }) ,
};

export const GerdQQuestionsSlice = createSlice({
  name: 'gerdQQuestions',
  initialState,
  reducers: {

    setAnswer: (
      state,
      action: PayloadAction<{ title: string; option: Option }>
    ) => {
      const questionIndex = state.list.findIndex(
        (el) => el.title === action.payload.title
      );

      state.list[questionIndex].value = action.payload.option;
    },

    resetAnswers: (state) => {
      state.list = questions.map((el) => {
        return {
          ...el,
          value: undefined,
        };
      });
    },
  },
});

export const { setAnswer, resetAnswers } = GerdQQuestionsSlice.actions;

export const selectGerdQQuestions = (state: RootState) => state.gerdQQuestions.list;

export default GerdQQuestionsSlice.reducer;
