import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    PC: { out: "xxxx" },
    MAR: {
        in: "xxxx",
        bottom: "xxxx"
    },
    RAM: { out: "xxxxxxxx" },
    IR: {
        in: "xxxxxxxx",
        out: "xxxx",
        bottom: "xxxx"
    },
    CU: { bottom: "001111100011" },
    BUS: "xxxxxxxx",
    A: {
        out: "xxxxxxxx",
        in: "xxxxxxxx",
        bottom: "xxxxxxxx"
    },
    ALU: { out: "xxxxxxxx" },
    B: {
        in: "xxxxxxxx",
        bottom: "xxxxxxxx"
    },
    OUT: {
        in: "xxxxxxxx",
        bottom: "xxxxxxxx"
    },
    RES: NaN
}

const busSlice = createSlice({
    name: "bus",
    initialState,
    reducers: {
        resetBus: () => initialState,
        setBusValue: (state, { payload }) => {
            state.BUS = payload.value.padStart(8, "x")
        },
        setInstructionWord: (state, { payload }) => {
            state.CU.bottom = payload.value
        },
        setBusBlockValue: (state, { payload }) => {
            state[payload.name][payload.bus] = payload.value
        },
        addressBusReducer: (state, { payload }) => {
            const { value } = payload

            state.PC.out = value
            state.MAR.in = value
            state.BUS = value.padStart(8, "x")
        },
        memoryBusReducer: (state, { payload }) => {
            const { value, bus } = payload

            state.MAR.bottom = bus
            state.RAM.out = value
            state.IR.in = value
            state.IR.bottom = value.slice(0, 4)
            state.BUS = value.padStart(8, "x")
        },
        commonBusReducer: (state, { payload }) => {
            const { value } = payload

            state.IR.out = value
            state.MAR.in = value
            state.BUS = value.padStart(8, "x")
        },
        ldaBusReducer: (state, { payload }) => {
            const { value, bus } = payload

            state.MAR.bottom = bus
            state.RAM.out = value
            state.A.in = value
            state.BUS = value
        },
        outBusReducer: (state, { payload }) => {
            const { value } = payload

            state.A.out = value
            state.OUT.in = value
            state.OUT.bottom = value
            state.BUS = value
        }
    }
})

export const {
    resetBus,
    setBusValue,
    setInstructionWord,
    setBusBlockValue,
    addressBusReducer,
    memoryBusReducer,
    commonBusReducer,
    ldaBusReducer,
    outBusReducer
} = busSlice.actions

export default busSlice.reducer