import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Examination, Option } from '../types/interfaces';
import { RootState } from '../app/store';

import examinations from '../data/examinationsData'

export interface ExaminationsState {
  selected: Examination[];
  list: Examination[];
}

const initialState: ExaminationsState = {
  selected: [],
  list: Object.values(examinations)
};

export const examinationsSlice = createSlice({
  name: 'examinations',
  initialState,
  reducers: {
    addSelectedExamination: (state, action: PayloadAction<Examination>) => {
      const inArray = state.selected.some(el => el.title === action.payload.title)

      if (inArray) return

      state.selected.push(action.payload)
    },
    removeSelectedExamination: (state, action: PayloadAction<Examination>) => {
      state.selected = state.selected.filter(el => el.title !== action.payload.title)
    },
    clearSelectedExaminations: (state) => {
      state.selected = []
    },
    addSelectedExaminationAnswer: (state, action: PayloadAction<{ examinationTitle: string, questionTitle: string, answer: Option }>) => {

      state.selected = state.selected.map((item) => {

        if (item.title === action.payload.examinationTitle) {

          return {
            ...item,
            questions: item.questions?.map((question) => {
              

              if (question.title === action.payload.questionTitle) {

                console.log(action.payload.answer)
                
                return {
                  ...question,
                  value: action.payload.answer
                }
              }

              return question
            })

          }

 
        }

        return item
      })

    },
  },
});

export const { addSelectedExamination, removeSelectedExamination, clearSelectedExaminations, addSelectedExaminationAnswer } = examinationsSlice.actions;


export const selectSelectedExaminations = (state: RootState) => state.examinations.selected;
export const selectExaminations = (state: RootState) => state.examinations.list


export default examinationsSlice.reducer;
