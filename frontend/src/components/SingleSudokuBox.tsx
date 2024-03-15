import { useState } from "react";
//maybe use instead of 
export default function SingleSudokuBox(props: any) {
    const [inputNumber, changeInputNumber] = useState(props.initValue)
    return <div>
        <input type="text" onChange={(e) => changeInputNumber(e.target.value)} />
    </div>
}