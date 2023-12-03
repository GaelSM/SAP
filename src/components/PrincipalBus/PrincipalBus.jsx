import { useSelector } from "react-redux";
import "./PrincipalBus.css"

export default function PrincipalBus() {
    const bus = useSelector(state => state.bus["BUS"])

    return (
        <div className="principal-bus">
            {
                bus.split("").map(pin => (
                    <div 
                        key={self.crypto.randomUUID()}
                        className={`pin${pin === "1" ? " active" : ""}${pin === "x" ? " disabled" : ""}`}
                    />
                ))
            }
        </div>
    )
}