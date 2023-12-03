import { configureStore } from "@reduxjs/toolkit";
import pinsReducer from './pinSlice'
import memoryReducer from './memorySlice'
import blockReducer from './blockSlice'
import busReducer from './busSlice'
import timerReducer from './timerSlice'

export const store = configureStore({
    reducer: {
        pins: pinsReducer,
        memory: memoryReducer,
        block: blockReducer,
        bus: busReducer,
        timer: timerReducer
    }
})