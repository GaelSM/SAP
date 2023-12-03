import SAP from './components/SAP'
import Menu from './components/Menu/Menu'
import { useState } from 'react'
import ControlWord from './components/ControlWord/ControlWord'
import { useDispatch, useSelector } from 'react-redux'
import { addressBusReducer, commonBusReducer, ldaBusReducer, memoryBusReducer, outBusReducer, resetBus, setBusBlockValue, setBusValue, setInstructionWord } from './redux/busSlice'
import { modifiedControlWord, resetPins } from './redux/pinSlice'
import { ADRESS_STATE, ALL_DISABLED, COMMON_STATE, INCREMENT_STATE, LDA, MEMORY_STATE, OPERATION, OUT } from './utilities/const'
import { adressBlockReducer, incrementPC, memoryBlockReducer, outBlockReducer, resetBlock, setBlockValue } from './redux/blockSlice'
import { incrementTimer, resetTimer } from './redux/timerSlice'
import './App.css'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [startEnabled, setStartEnalbled] = useState(false)
  const [nextEnabled, setNextEnalbled] = useState(true)
  const [restartEnabled, setRestartEnalbled] = useState(true)
  const [subSelector, setSubSelector] = useState(0)

  //Data
  const memory = useSelector(state => state.memory)
  const block = useSelector(state => state.block)
  const timer = useSelector(state => state.timer)

  const dispatch = useDispatch()

  //Functions
  const openRAM = () => setIsOpen(prev => !prev)

  const clock = () => {
    setSubSelector(0)
    dispatch(resetTimer())
  }

  const addresInstruction = () => {
    dispatch(setInstructionWord({ value: ADRESS_STATE.join("") }))
    dispatch(modifiedControlWord({ value: ADRESS_STATE }))
    dispatch(addressBusReducer({ value: block.PC }))
    dispatch(adressBlockReducer({ value: block.PC }))
  }

  const incrementInstruction = () => {
    dispatch(setInstructionWord({ value: INCREMENT_STATE.join("") }))
    dispatch(modifiedControlWord({ value: INCREMENT_STATE }))
    dispatch(incrementPC())
  }

  const memoryInstruction = () => {
    let currentValue = memory[parseInt(block.MAR, 2)].value

    dispatch(setInstructionWord({ value: MEMORY_STATE.join("") }))
    dispatch(modifiedControlWord({ value: MEMORY_STATE }))

    dispatch(memoryBlockReducer({ value: currentValue }))
    dispatch(memoryBusReducer({ value: currentValue, bus: block.MAR }))
  }

  const instructions = [
    addresInstruction,
    incrementInstruction,
    memoryInstruction,
  ]

  const outInstruction = () => {
    dispatch(setInstructionWord({ value: OUT.join("") }))
    dispatch(modifiedControlWord({ value: OUT }))

    dispatch(outBusReducer({ value: block.A }))
    dispatch(outBlockReducer({ value: block.A }))

    clock()
  }

  const commonInstruction = () => {
    let commonValue = block.IR.slice(4, 9)

    dispatch(setInstructionWord({ value: COMMON_STATE.join("") }))
    dispatch(modifiedControlWord({ value: COMMON_STATE }))

    dispatch(commonBusReducer({ value: commonValue }))
    dispatch(setBlockValue({ name: "MAR", value: commonValue }))
  }

  const ldaInstruction = () => {
    if (subSelector === 1) {
      let currentaValue = memory[parseInt(block.MAR, 2)].value
      dispatch(setInstructionWord({ value: LDA.join("") }))
      dispatch(modifiedControlWord({ value: LDA }))

      dispatch(ldaBusReducer({ value: currentaValue, bus: block.MAR }))

      dispatch(setBlockValue({ name: "RAM", value: currentaValue }))
      dispatch(setBlockValue({ name: "A", value: currentaValue }))
    }
    if (subSelector === 2) {
      dispatch(setInstructionWord({ value: ALL_DISABLED.join("") }))
      dispatch(modifiedControlWord({ value: ALL_DISABLED }))
    }
  }

  const addSubInstruction = () => {
    if (subSelector === 1) {
      dispatch(setInstructionWord({ value: OPERATION[subSelector - 1].join("") }))
      dispatch(modifiedControlWord({ value: OPERATION[subSelector - 1] }))

      let currentValue = memory[parseInt(block.MAR, 2)].value

      dispatch(setBusBlockValue({ name: "MAR", value: block.MAR, bus: "bottom" }))
      dispatch(setBusBlockValue({ name: "RAM", value: currentValue, bus: "out" }))
      dispatch(setBusBlockValue({ name: "B", value: currentValue, bus: "in" }))
      dispatch(setBusValue({ value: currentValue }))

      dispatch(setBlockValue({ name: "RAM", value: currentValue }))
      dispatch(setBlockValue({ name: "B", value: currentValue }))
    }
    if (subSelector === 2) {
      dispatch(setInstructionWord({ value: OPERATION[subSelector - 1].join("") }))
      dispatch(modifiedControlWord({ value: OPERATION[subSelector - 1] }))

      dispatch(setBusBlockValue({ name: "A", value: block.A, bus: "bottom" }))
      dispatch(setBusBlockValue({ name: "B", value: block.B, bus: "bottom" }))

      let num1 = parseInt(block.A, 2)
      let num2 = parseInt(block.B, 2)

      let sum = (block.CU === "ADD") ? num1 + num2 : num1 - num2
      
      dispatch(setBlockValue({ name: "ALU", value: sum.toString() }))

      let currentValue = sum.toString(2).padStart(8, "0")

      dispatch(setBusBlockValue({ name: "ALU", value: currentValue, bus: "out" }))
      dispatch(setBusValue({ value: currentValue }))
      dispatch(setBusBlockValue({ name: "A", value: currentValue, bus: "in" }))

      dispatch(setBlockValue({ name: "A", value: currentValue }))
    }
  }

  const selectInstruction = () => {
    if (block.CU === "HLT") return setNextEnalbled(true)
    if (block.CU === "OUT") return outInstruction()

    if (subSelector === 0) commonInstruction()
    if (block.CU === "LDA") ldaInstruction()
    else addSubInstruction()

    if (timer === 5) return clock()

    dispatch(incrementTimer())
    setSubSelector(prev => prev + 1)
  }

  const handleStart = () => {
    if (timer > 0) return
    instructions[timer]()
    dispatch(incrementTimer())
    setStartEnalbled(true)
    setNextEnalbled(false)
    setRestartEnalbled(false)
    setSubSelector(0)
  }

  const handleNext = () => {
    if (startEnabled === false) return

    dispatch(resetBus())

    if (timer < 3) {
      instructions[timer]()
      dispatch(incrementTimer())
    } else selectInstruction()
  }

  const handleRestart = () => {
    if (startEnabled === false) return
    dispatch(resetBus())
    dispatch(resetPins())
    dispatch(resetBlock())
    dispatch(resetTimer())
    setStartEnalbled(false)
    setNextEnalbled(true)
    setRestartEnalbled(true)
  }

  return (
    <main>
      {isOpen && <Menu handleClick={openRAM} />}
      <SAP handleClick={openRAM} />
      <ControlWord />
      <div className="buttons">
        <button onClick={handleStart} disabled={startEnabled}> Start </button>
        <button onClick={handleNext} disabled={nextEnabled}> Next </button>
        <button onClick={handleRestart} disabled={restartEnabled}> Restart </button>
      </div>
    </main>
  )
}