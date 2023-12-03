import './Bits.css'

export default function Bits({ bits }) {
    return (
        <div className="bits">
            {
                bits.split("").map(bit => (
                    <div className={bit === "1" ? "bit active" : "bit"} key={crypto.randomUUID()}>
                        <p> {bit} </p>
                    </div>
                ))
            }
        </div>
    )
}