import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option, QuestionEntry } from '../../types/interfaces';
import { RootState } from '../../app/store';

import examinations from './data/examinations.json'

export interface ExaminationsState {
  list: QuestionEntry[];
}

const initialState: ExaminationsState = {
  list: Object.values(examinations)
};

export const srkExaminationsSlice = createSlice({
  name: 'srkExaminations',
  initialState,
  reducers: {
    addSelectedSrkExaminationAnswer: (state, action: PayloadAction<{ id: string, answer: Option }>) => {

      const questionIndex = state.list.findIndex(
        (el) => el.id === action.payload.id
      );

      if (questionIndex < 0) return 

      state.list[questionIndex].value = action.payload.answer;
    },

    clearSrkExaminations: (state) => {
      state.list = state.list.map(el => {
        return {
          ...el,
          value: undefined
        }
      })

      console.log(state.list)
    }
  },
});

export const { addSelectedSrkExaminationAnswer, clearSrkExaminations } = srkExaminationsSlice.actions;

export const selectSrkExaminations = (state: RootState) => state.srkExaminations.list


export default srkExaminationsSlice.reducer;
