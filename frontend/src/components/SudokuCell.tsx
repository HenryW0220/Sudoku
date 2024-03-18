import { useState } from "react";
//maybe use instead of 
export default function SudokuCell(props: any) {
    const [inputNumber, changeInputNumber] = useState(props.initValue)
  
    return <div className="outline outline-1 p-1">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            <input style={{backgroundColor: "transparent", outline: 0}} value={inputNumber} onChange={(e) => changeInputNumber(e.target.value)} type="text" min="1" max="9"></input>
            
    </div>
}