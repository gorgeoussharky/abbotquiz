
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option, QuestionEntry } from '../types/interfaces';
import { RootState } from '../app/store';

import questions from '../data/srk/rim4.json';

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

export const rim4Slice = createSlice({
  name: 'rim4',
  initialState,
  reducers: {

    setRim4Answer: (
      state,
      action: PayloadAction<{ title: string; option: Option }>
    ) => {
      const questionIndex = state.list.findIndex(
        (el) => el.title === action.payload.title
      );

      state.list[questionIndex].value = action.payload.option;
    },

    resetRim4Answers: (state) => {
      state.list = questions.map((el) => {
        return {
          ...el,
          value: undefined,
        };
      });
    },
  },
});

export const { setRim4Answer, resetRim4Answers } = rim4Slice.actions;

export const selectRim4Questions = (state: RootState) => state.rim4.list;

export default rim4Slice.reducer;
