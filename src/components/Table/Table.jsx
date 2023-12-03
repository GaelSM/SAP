import PopUp from "../Popup/Popup"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Table() {
    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState("")
    const values = useSelector(state => state.memory)

    const handleClick = (index) => {
        setIndex(index)
        setIsOpen(prev => !prev)
    }

    return (
        <div className='table'>
            {isOpen && <PopUp setIsOpen={setIsOpen} index={index}/>}
            
            {
                values.map((filas, index) => (
                    <div className='filas' key={crypto.randomUUID()}>
                        <div className='direccion' onClick={() => handleClick(index)}>
                            <p> {index} </p>
                        </div>
                        <div className="columnas">
                            {
                                filas.value.split("")
                                    .map(columnas => <div key={crypto.randomUUID()}> {columnas} </div>)
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}