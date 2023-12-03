import { useDispatch } from "react-redux"
import { setInstruction } from "../../redux/memorySlice"
import { useState } from "react"
import { verifyForm } from "../../utilities/custom"
import './Popup.css'

export default function PopUp({ setIsOpen, index }) {
    const dispatch = useDispatch()
    const [isFact, setIsFact] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showInput, setShowInput] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        let { type, subtype, value } = Object.fromEntries(new FormData(e.target))

        if (type === undefined || (type === "INS" && subtype === undefined) || value === "") return

        const final = verifyForm(type, subtype, value)

        const { operation, finalValue } = final

        if (finalValue === -1) return

        dispatch(setInstruction({ index, operation, value: finalValue }))

        e.target.reset()
        setIsOpen(false)
    }

    const handleOption = (e) => {
        const { value } = e.target
        if (value === "INS") {
            setShowOptions(true)
            setShowInput(false)
            setIsFact(false)
        }
        else {
            setIsFact(true)
            setShowOptions(false)
            setShowInput(true)
        }
    }

    const handleInput = (e) => {
        const { value } = e.target
        if (value === "HLT" || value === "OUT") setShowInput(false)
        else setShowInput(true)
    }

    return (
        <section className="overlay">
            <form className="popup" onSubmit={handleSubmit}>
                <div onClick={() => setIsOpen(prev => !prev)} className='cerrar'>
                    <p> × </p>
                </div>
                <header>
                    <label htmlFor="INS">
                        Instruction
                        <input type="radio" name="type" value="INS" id="INS" onClick={handleOption} />
                    </label>
                    <label htmlFor="FACT">
                        Data
                        <input type="radio" name="type" value="FACT" id="FACT" onClick={handleOption} />
                    </label>
                </header>
                {
                    showOptions &&
                    <main>
                        <label htmlFor="LDA">
                            LDA
                            <input type="radio" name="subtype" value="LDA" id="LDA" onClick={handleInput} />
                        </label>
                        <label htmlFor="ADD">
                            ADD
                            <input type="radio" name="subtype" value="ADD" id="ADD" onClick={handleInput} />
                        </label>
                        <label htmlFor="SUB">
                            SUB
                            <input type="radio" name="subtype" value="SUB" id="SUB" onClick={handleInput} />
                        </label>
                        <label htmlFor="OUT">
                            OUT
                            <input type="radio" name="subtype" value="OUT" id="OUT" onClick={handleInput} />
                        </label>
                        <label htmlFor="HLT">
                            HLT
                            <input type="radio" name="subtype" value="HLT" id="HLT" onClick={handleInput} />
                        </label>
                    </main>
                }
                {
                    showInput &&
                    <input 
                        type="text" 
                        name="value" 
                        placeholder={isFact ? "Dato" : "Dirección"} 
                        autoComplete="off"
                    />
                }
                <button> Send </button>
            </form>
        </section>
    )
}