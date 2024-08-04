
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
        setValue: (
            state,
            action: PayloadAction<{ id: string; base?: number, max?: number }>
        ) => {

            const questionIndex = state.list.findIndex(
                (el) => el.id === action.payload.id
            );
            if (action.payload.base) {
                state.list[questionIndex].value_base = action.payload.base;
            }

            if (action.payload.max) {
                state.list[questionIndex].value_max = action.payload.max;
            }
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

export const { setValue, resetValues } = LPPType.actions;

export const selectLPPType = (state: RootState) => state.lppType.list;

export default LPPType.reducer;
