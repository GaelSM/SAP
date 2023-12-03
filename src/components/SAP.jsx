import Block from "./Block/Block"
import PrincipalBus from "./PrincipalBus/PrincipalBus"

export default function Left({ handleClick }) {
    return (
        <section className="sap">
            <div className="left">
                <Block name="PC" direction="right" />
                <Block name="MAR" direction="right" />
                <Block name="RAM" direction="right" handleClick={handleClick} />
                <Block name="IR" direction="right" />
                <Block name="CU" direction="right" />
            </div>
            <PrincipalBus />
            <div className="sap-right">
                <Block name="A" direction="left"/>
                <Block name="ALU" direction="left"/>
                <Block name="B" direction="left"/>
                <Block name="OUT" direction="left"/>
                <Block name="RES" direction="left"/>
            </div>
        </section>
    )
}