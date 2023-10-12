import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionEntry } from '../../../types/interfaces';
import { RootState } from '../../app/store';

import questions from '../../data/gerdQ.json';

export interface SymptomsState {
  questions: QuestionEntry[];
}

const initialState: SymptomsState = {
  questions: questions.map((el) => {
    return {
      ...el,
      values: [],
    };
  }),
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<QuestionEntry>) => {
        const questionsClone = structuredClone(state.questions)
        const question = questionsClone.find(el => el.title === action.payload.title)

        if (!question) return 

        state.questions = questionsClone
    },
  },
});

export const { setAnswer } =
questionsSlice.actions;

export const selectQuestions = (state: RootState) =>
  state.questions.questions;

export default questionsSlice.reducer;
