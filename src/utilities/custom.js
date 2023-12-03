import { BLOCK_ACTIVE, OPERATIONS } from "./const"
import { PINS_BY_BLOCK } from "../utilities/const"

export function verifyForm(type, subtype, value) {
    let finalValue

    if(type === "FACT") {
        if(value > 128) return {operation: "FAIL", finalValue: -1}
        finalValue = parseInt(value).toString(2).padStart(8, "0")
    }
    else {
        if(value < 0 || value > 15) return {operation: "FAIL", finalValue: -1}
        if (subtype === "HLT") finalValue = "11110000"
        else if(subtype === "OUT") finalValue = "11100000"
        else finalValue = OPERATIONS[subtype] + parseInt(value).toString(2).padStart(4, "0")
    }

    return {operation: type, finalValue}
}

export function blockIsActive(control, name) {
    if(name === "CU" || name === "RES") return false
    return PINS_BY_BLOCK[name].every((pin, index) => control[pin] === BLOCK_ACTIVE[name].disabled[index])
}

export function decimalToBCD(number) {
    if(number > 15) return (0).toString(2).padStart(4,"0")
    return number.toString(2).padStart(4,"0")
}