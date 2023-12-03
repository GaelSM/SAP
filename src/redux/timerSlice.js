import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        incrementTimer: (state) => state + 1,
        resetTimer: (state) => state = 0
    }
})

export const {incrementTimer, resetTimer} = timerSlice.actions

export default timerSlice.reducer