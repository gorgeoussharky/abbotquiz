import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBEntry } from '../../types/interfaces';
import { RootState } from '../../app/store';

import db from './data/db.json'

export interface SymptomsState {
  selected: DBEntry[];
  db: DBEntry[];
}

const initialState: SymptomsState = {
  selected: [],
  db
};

export const srkSymptomsSlice = createSlice({
  name: 'srkSymptoms',
  initialState,
  reducers: {
    addSrkSelectedSymptom: (state, action: PayloadAction<DBEntry>) => {
      const inArray = state.selected.some(el => el.title === action.payload.title)

      if (inArray) return

      state.selected.push(action.payload)
    },
    removeSrkSelectedSymptom: (state, action: PayloadAction<DBEntry>) => {
        state.selected = state.selected.filter(el => el.title !== action.payload.title)
    },
    clearSrkSelectedSymptoms: (state) => {
      state.selected = []
    }
  },
});

export const { addSrkSelectedSymptom, removeSrkSelectedSymptom, clearSrkSelectedSymptoms } = srkSymptomsSlice.actions;


export const selectSrkSelectedSymptoms = (state: RootState) => state.srkSymptoms.selected;
export const selectSrkSymptomsDB = (state: RootState) => state.srkSymptoms.db

export default srkSymptomsSlice.reducer;
