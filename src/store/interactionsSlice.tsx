import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import medicaments from '../data/medicamentsDb.json'

export interface InteractionsState {
  selected: string[];
  medicaments: string[];
}

const initialState: InteractionsState = {
  selected: [],
  medicaments,

};

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    addSelectedMedicament: (state, action: PayloadAction<string>) => {
      const inArray = state.selected.some(el => el === action.payload)

      if (inArray) return

      state.selected.push(action.payload)
    },
    removeSelectedMedicament: (state, action: PayloadAction<string>) => {
        state.selected = state.selected.filter(el => el !== action.payload)
    },
    clearSelectedMedicaments: (state) => {
      state.selected = []
    },
  },
});

export const { addSelectedMedicament, removeSelectedMedicament, clearSelectedMedicaments } = interactionsSlice.actions;


export const selectSelectedMedicaments = (state: RootState) => state.interactions.selected;
export const selectMedicaments = (state: RootState) => state.interactions.medicaments

export default interactionsSlice.reducer;
