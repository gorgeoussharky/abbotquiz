import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LPPMedicamentEntry } from '../../types/interfaces';
import { RootState } from '../../app/store';

import meds from './data/medicaments.json'

export interface SymptomsState {
  selected: string[];
  medicaments: LPPMedicamentEntry[];
}

const initialState: SymptomsState = {
  selected: [],
  medicaments: meds as LPPMedicamentEntry[]
};

export const lppMedicamentsSlice = createSlice({
  name: 'lppMedicamentsSlice',
  initialState,
  reducers: {
    addMedicament: (state, action: PayloadAction<string>) => {
      const inArray = state.selected.some(el => el === action.payload)

      if (inArray) return

      state.selected.push(action.payload)
    },
    removeMedicament: (state, action: PayloadAction<string>) => {
        state.selected = state.selected.filter(el => el !== action.payload)
    },
    clearMedicaments: (state) => {
      state.selected = []
    }
  },
});

export const { addMedicament, removeMedicament, clearMedicaments } = lppMedicamentsSlice.actions;


export const selectSelectedLPPMedicaments = (state: RootState) => state.lppMedicaments.selected;
export const selectLPPMedicaments = (state: RootState) => state.lppMedicaments.medicaments

export default lppMedicamentsSlice.reducer;
