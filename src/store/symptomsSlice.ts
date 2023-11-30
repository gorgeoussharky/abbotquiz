import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBEntry } from '../types/interfaces';
import { RootState } from '../app/store';

import db from '../data/db.json'

export interface SymptomsState {
  selected: DBEntry[];
  db: DBEntry[];
}

const initialState: SymptomsState = {
  selected: [],
  db
};

export const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    addSelectedSymptom: (state, action: PayloadAction<DBEntry>) => {
      const inArray = state.selected.some(el => el.title === action.payload.title)

      if (inArray) return

      state.selected.push(action.payload)
    },
    removeSelectedSymptom: (state, action: PayloadAction<DBEntry>) => {
        state.selected = state.selected.filter(el => el.title !== action.payload.title)
    },
    clearSelectedSymptoms: (state) => {
      state.selected = []
    }
  },
});

export const { addSelectedSymptom, removeSelectedSymptom, clearSelectedSymptoms } = symptomsSlice.actions;


export const selectSelectedSymptoms = (state: RootState) => state.symptoms.selected;
export const selectSymptomsDB = (state: RootState) => state.symptoms.db

export default symptomsSlice.reducer;
