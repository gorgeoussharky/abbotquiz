import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


export interface UtilsSliceState {
  hasLastDiagnosis: boolean;
  prevBlocksHistory: string[],
  medsToCheck: string[],
}

const initialState: UtilsSliceState = {
  hasLastDiagnosis: false,
  prevBlocksHistory: [],
  medsToCheck: [
    "Рабепразол",
    "Лансопразол",
    "Омепразол",
    "Пантопразол",
    "Эзомепразол",
    "Декслансопразол",
    "Гиосцин"
],
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setHasLastDiagnosis: (state, action: PayloadAction<boolean>) =>  {
        state.hasLastDiagnosis = action.payload
    },
    addBlockHistory: (state, action: PayloadAction<string>) => {
        const inArray = state.prevBlocksHistory.some(el => el === action.payload)

        if (inArray) return
  
        state.prevBlocksHistory.push(action.payload)
    },
    removeLastBlockHistoryElement: (state) => {
        state.prevBlocksHistory = state.prevBlocksHistory.slice(0, -1)
    },
    clearHistory: (state) => {
        state.prevBlocksHistory = []
    },
    setMedsToCheck: (state, action: PayloadAction<string[]>) => {
      state.medsToCheck = action.payload
    }
  },
});

export const {
    addBlockHistory,
    setHasLastDiagnosis,
    removeLastBlockHistoryElement,
    clearHistory,
    setMedsToCheck
} = utilsSlice.actions;

export const selectHasLastDiagnosis = (state: RootState) => state.utils.hasLastDiagnosis
export const selectPrevBlocksHistory = (state: RootState) => state.utils.prevBlocksHistory
export const selectMedsToCheck = (state: RootState) => state.utils.medsToCheck

export default utilsSlice.reducer;
