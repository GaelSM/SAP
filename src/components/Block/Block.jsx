import { useSelector } from "react-redux"
import Bits from "../Bits/Bits"
import Bus from "../Bus/Bus"
import "./Block.css"
import { blockIsActive } from "../../utilities/custom"

export default function Block({ name, handleClick, direction }) {
    const bits = useSelector(state => state.block[name])
    const bus = useSelector(state => state.bus[name])
    const pins = useSelector(state =>state.pins)

    return (
        <section className={`block ${name} ${!blockIsActive(pins.controlWord, name) ? "" : "disabled"}`} onClick={handleClick}>
            <div className={`name ${name}`}>
                <p> {name} </p>
            </div>
            { bits.match(/[0-1]/) 
                ? <Bits bits={ bits }/> 
                : <div className="especial-value">
                    { bits }
                </div>
            }
            { bus.out && <Bus value={bus.out} direction={direction} type="out"/> }
            { bus.in && <Bus value={bus.in} direction={direction} type="in"/> }
            { bus.bottom && <Bus value={bus.bottom} direction="bottom" type="out"/>}
        </section>
    )
}