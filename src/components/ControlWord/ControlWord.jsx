import { useSelector } from "react-redux"
import "./ControlWord.css"

export default function ControlWord() {
    const controlWord = useSelector(state => state.pins.controlWord)
    return (
        <section className="controlWord">
            {
                Object.keys(controlWord).map(value => (
                    <div key={self.crypto.randomUUID()} className="word"> 
                        <div className="name">
                            {value}
                        </div>
                        <div className={controlWord[value] === 1 ? "active" : ""}>
                            {controlWord[value]}
                        </div>
                    </div>
                ))
            }
        </section>
    )
}