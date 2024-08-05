import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option, QuestionEntry } from '../../types/interfaces';
import { RootState } from '../../app/store';

import hepatocellular from './data/rucam_hepatocellular.json';
import mixed from './data/rucam_mixed.json';

export interface RucamSlice {
  hepatocellular: QuestionEntry[];
  mixed: QuestionEntry[];
  activeList: QuestionEntry[];
}

const initialState: RucamSlice = {
  hepatocellular: hepatocellular as QuestionEntry[],
  mixed: mixed as QuestionEntry[],
  activeList: [],
};

export const rucam = createSlice({
  name: 'rucam',
  initialState,
  reducers: {
    setInitialList: (
      state,
      action: PayloadAction<{ type: 'hepatocellular' | 'mixed' }>
    ) => {
      if (action.payload.type === 'hepatocellular') {
        state.activeList = state.hepatocellular;
      } else if (action.payload.type === 'mixed') {
        state.activeList = state.mixed;
      }
    },

    resetList: (state) => {
      state.activeList = [];
    },

    setRucamAnswer: (
      state,
      action: PayloadAction<{ id: string; answer: Option }>
    ) => {
      const questionIndex = state.activeList.findIndex(
        (el) => el.id === action.payload.id
      );

      state.activeList[questionIndex].value = action.payload.answer;
    },

    clearRucamAnswer: (state, action: PayloadAction<{ id: string }>) => {
      const questionIndex = state.activeList.findIndex(
        (el) => el.id === action.payload.id
      );

      state.activeList[questionIndex].value = undefined;
    },

    setRucamGroupAnswer: (
      state,
      action: PayloadAction<{
        value: boolean;
        optionIndex: number;
        groupId: string;
        questionId: string;
        valueIndex: number;
      }>
    ) => {
      const questionIndex = state.activeList.findIndex(
        (el) => el.id === action.payload.questionId
      );

      if (questionIndex < 0) return;

      const groupIndex = state.activeList[questionIndex].groups?.findIndex(
        (el) => el.id === action.payload.groupId
      );

      if (typeof groupIndex !== 'number' || groupIndex < 0) return;

      if (!state.activeList[questionIndex].groups) return;

      // =/ отвратительно
      // @ts-ignore
      state.activeList[questionIndex].groups[groupIndex].options[
        action.payload.optionIndex
      ].value[action.payload.valueIndex] = action.payload.value;
    },

    clearRucamGroupAnswer: (
      state,
      action: PayloadAction<{ groupId: string; questionId: string }>
    ) => {
      const questionIndex = state.activeList.findIndex(
        (el) => el.id === action.payload.questionId
      );

      if (questionIndex < 0) return;

      const groupIndex = state.activeList[questionIndex].groups?.findIndex(
        (el) => el.id === action.payload.groupId
      );

      if (typeof groupIndex !== 'number' || groupIndex < 0) return;

      if (!state.activeList[questionIndex].groups) return;

      // @ts-ignore
      state.activeList[questionIndex].groups[groupIndex].options.forEach(
        (el) => {
          el.value = [false, false];
        }
      );
    },
  },
});

export const {
  setInitialList,
  setRucamAnswer,
  resetList,
  setRucamGroupAnswer,
  clearRucamAnswer,
  clearRucamGroupAnswer,
} = rucam.actions;

export const selectRucamList = (state: RootState) => state.rucam.activeList;

export default rucam.reducer;
