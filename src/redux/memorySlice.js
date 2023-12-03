import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
    {type: "LDA", value: "00000000"},
]

const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers: {
        setInstruction: (state, {payload}) => {
            const {index, operation, value} = payload
            state[index].type = operation
            state[index].value = value
        },
    }
})

export const { setInstruction } = memorySlice.actions

export default memorySlice.reducer