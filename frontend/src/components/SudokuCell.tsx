import { useState, useEffect } from "react"
//import Lottie from "lottie-react"
//import animationData from '../lotties/correctAnimation.json'

export default function SudokuCell(props: any) {
    const row= props.row
    const column= props.col
    // eslint-disable-next-line
    const [inputNumber, changeInputNumber] = useState(0)
    const sudokuCellClicked = () => {
        props.sudokuCellSelected(row, column)
    }

    useEffect(() => {
        changeInputNumber(props.initValue)
        console.log(props.initValue);

    },[props])

    return <div onClick={sudokuCellClicked} className= {`outline outline-1 p-1 size-16 ${props.shaded ? "bg-purple-100" : "bg-white"} flex items-center hover:bg-slate-200 transition-color duration-150
                ${props.row===1 && props.col===1 && "rounded-tl-3xl"}
                ${props.row===1 && props.col===9 && "rounded-tr-3xl"}
                ${props.row===9 && props.col===1 && "rounded-bl-3xl"}
                ${props.row===9 && props.col===9 && "rounded-br-3xl"}`}>
                <span className="relative flex size-12">
                    <p className={`size-16 text-center mt-4`}>{inputNumber}</p>
                    {props.shaded &&
                        <span className="ease-in-out animate-ping absolute rounded-sm h-8 w-8 bg-purple-100 opacity-90"></span>
                    }
                </span>
        </div>
}