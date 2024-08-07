
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LPPTypeEntry } from '../../types/interfaces';
import { RootState } from '../../app/store';

import questions from './data/lppType.json';

export interface GerdQQuestionsState {
    list: LPPTypeEntry[];
}

const initialState: GerdQQuestionsState = {
    list: questions
};

export const LPPType = createSlice({
    name: 'LPPType',
    initialState,
    reducers: {
        updateList: (
            state,
            action: PayloadAction<{ list: LPPTypeEntry[] }>
        ) => {
            state.list = action.payload.list
        },

        resetValues: (state) => {
            state.list = questions.map((el) => {
                return {
                    ...el,
                    value_base: 0,
                    value_max: 0,
                }
            })
        },
    },
});

export const { updateList, resetValues } = LPPType.actions;

export const selectLPPType = (state: RootState) => state.lppType.list;

export default LPPType.reducer;
