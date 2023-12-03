import "./Bus.css"

export default function Bus({ value, direction, type}) {
    const currentValue = direction === "left" ? value.split("").reverse() :  value.split("")
    const inactive = value.split("").every(pin => pin === "x")

    return (
        <div className={`bus ${direction} ${value.length === 4 ? "four" : "eight"} ${type} ${inactive ? "bus-inactive" : "bus-active"}`}>
            {
                currentValue.map(value => (
                    <div
                        key={self.crypto.randomUUID()}
                        className={`pin${value === "1" ? " active" : ""}`}
                    />
                ))
            }
        </div>
    )
}