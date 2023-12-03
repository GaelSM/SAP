import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    controlWord: {
        CP: 0,
        EP: 0,
        LMN: 1,
        CEN: 1,
        LIN: 1,
        EIN: 1,
        LAN: 1,
        EA: 0,
        SU: 0,
        EU: 0,
        LBN: 1,
        LON: 1
    },
    clockPins: {
        CLK: 0,
        CLKN: 0,
        CLR: 0,
        CLRN: 0,
    }
}

export const pinsSlice = createSlice({
    name: 'pins',
    initialState,
    reducers: {
        resetPins: () => initialState,
        modifiedControlWord: (state, {payload}) => {
            Object.keys(state.controlWord).map((name, index) => {
                state.controlWord[name] = payload.value[index]
            })
        }
    }
})

export const {resetPins, modifiedControlWord} = pinsSlice.actions

export default pinsSlice.reducer