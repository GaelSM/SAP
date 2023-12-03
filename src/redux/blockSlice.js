import { createSlice } from "@reduxjs/toolkit";
import { decimalToBCD } from "../utilities/custom";
import { OPERATIONS_BY_CODE } from "../utilities/const";

const initialState = {
    PC: "0000",
    MAR: "0000",
    RAM: "00000000",
    IR: "00000000",
    CU: "",
    A: "00000000",
    ALU: "",
    B: "00000000",
    OUT: "00000000",
    RES: ""
}

const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        resetBlock: () => initialState,
        incrementPC: (state) => {state.PC = decimalToBCD((parseInt(state.PC, 2) + 1))},
        setBlockValue: (state, {payload}) => {state[payload.name] = payload.value},
        adressBlockReducer: (state, {payload}) => { state.MAR = payload.value },
        memoryBlockReducer: (state, {payload}) => {
            const { value } = payload

            state.RAM = value
            state.IR = value
            state.CU = OPERATIONS_BY_CODE[value.slice(0, 4)]
        },
        outBlockReducer: (state, {payload}) => {
            const { value } = payload

            state.OUT = value
            state.RES = parseInt(value, 2).toString()
        }
    }
})

export const {
    resetBlock, 
    incrementPC, 
    setBlockValue, 
    adressBlockReducer,
    memoryBlockReducer,
    outBlockReducer
} = blockSlice.actions

export default blockSlice.reducer