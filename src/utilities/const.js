// MNEMOTECNICA PARA LAS OPERACIONES
export const OPERATIONS = {
    "LDA": "0000",
    "ADD": "0001",
    "SUB": "0010",
    "OUT": "1110",
    "HLT": "1111"
}

export const OPERATIONS_BY_CODE = {
    "0000": "LDA",
    "0001": "ADD",
    "0010": "SUB",
    "1110": "OUT",
    "1111": "HLT"
}

// PINES DE CONTROL
export const CONTROL_PINS = [
    "CP","EP","LMN","CEN",
    "LIN","EIN","LAN","EA",
    "SU","EU","LBN","LON"
]

//PINES POR BLOQUE
export const PINS_BY_BLOCK = {
    PC: ["CP", "EP"],
    MAR: ["LMN"],
    RAM: ["CEN"],
    IR: ["LIN", "EIN"],
    A: ["LAN", "EA"],
    ALU: ["SU", "EU"],
    B: ["LBN"],
    OUT: ["LON"]
}

export const BLOCK_ACTIVE = {
    PC: {
        increment: [1, 0],
        out: [0, 1],
        disabled: [0, 0]
    },
    MAR: {
        address: [0],
        disabled: [1]
    },
    RAM: {
        out: [0],
        disabled: [1]
    },
    IR: {
        in: [0, 1],
        out: [1, 0],
        disabled: [1, 1]
    },
    A: {
        in: [0, 0],
        out: [1, 1],
        disabled: [1, 0]
    },
    ALU: {
        sum: [1, 0],
        out: [0, 1],
        disabled: [0, 0]
    },
    B: {
        in: [0],
        disabled: [1]
    },
    OUT: {
        in: [0],
        disabled: [1]
    }
}

//ESTADO INICIAL
export const ALL_DISABLED = [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1]

// CICLO DE BUSQUEDA
export const ADRESS_STATE = [0,1,0,1,1,1,1,0,0,0,1,1]
export const INCREMENT_STATE = [1,0,1,1,1,1,1,0,0,0,1,1]
export const MEMORY_STATE = [0,0,1,0,0,1,1,0,0,0,1,1]

export const COMMON_STATE = [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1]

// CICLO DE EJECUCIÓN
// LDA
export const LDA = [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1]

//SUB - ADD
export const OPERATION = [
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1]
]

//OUT
export const OUT = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0]