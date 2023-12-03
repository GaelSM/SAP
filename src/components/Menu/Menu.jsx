import Table from "../Table/Table"
import "./Menu.css"

export default function Menu({handleClick}) {
    return (
        <section className='menu'>
            <h1> RAM Memory </h1>
            <div onClick={handleClick} className='cerrar'>
                <p> × </p>
            </div>
            <Table/>
        </section>
    )
}