import { useState } from "react";
//maybe use instead of 
export default function GridBox(props) {

    const [inputNumber, changeInputNumber] = useState(props.value)

    return <div>
        <input type="text" onChange={(e) => changeInputNumber(e.target.value)} />
    </div>
}