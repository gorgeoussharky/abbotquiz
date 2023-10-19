
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option, QuestionEntry } from '../types/interfaces';
import { RootState } from '../app/store';

import questions from '../data/gerdQ.json';

export interface QuestionsState {
  questions: QuestionEntry[];
}

const initialState: QuestionsState = {
  questions: questions.map((el) => {
    return {
      ...el,
      value: undefined,
    };
  }) ,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {

    setAnswer: (
      state,
      action: PayloadAction<{ title: string; option: Option }>
    ) => {
      const questionIndex = state.questions.findIndex(
        (el) => el.title === action.payload.title
      );

      state.questions[questionIndex].value = action.payload.option;
    },

    resetAnswers: (state) => {
      state.questions = questions.map((el) => {
        return {
          ...el,
          value: undefined,
        };
      });
    },
  },
});

export const { setAnswer, resetAnswers } = questionsSlice.actions;

export const selectQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;
