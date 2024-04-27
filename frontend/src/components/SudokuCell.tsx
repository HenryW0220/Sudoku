import { useEffect, useState } from "react";

export default function SudokuCell(props: any) {
    // eslint-disable-next-line
    const [inputNumber, changeInputNumber] = useState(props.initValue);
    const [color, setColor] = useState("");

    // Update local state when props.initValue changes from user input/keypad

    const handleCellClick = () => {
        props.sudokuCellSelected(props.row, props.col);
    };

    useEffect(() => {
        // updates number
        changeInputNumber(props.initValue);
        // updates color
        if (props.showingAnswer == true){
            if (props.provided == true){
                setColor("bg-white");
            }
            else {
                setColor(props.correct ? "bg-green-100" : "bg-red-100" );
            }
        }
        else{
            setColor(props.shaded ? "bg-purple-100" : "bg-white");

        }
    },[props])

    return (
        <div onClick={handleCellClick} className={`outline outline-1 p-1 size-16 
            ${color} flex items-center hover:bg-slate-200 transition-color duration-150
            ${props.row === 1 && props.col === 1 && "rounded-tl-3xl"}
            ${props.row === 1 && props.col === 9 && "rounded-tr-3xl"}
            ${props.row === 9 && props.col === 1 && "rounded-bl-3xl"}
            ${props.row === 9 && props.col === 9 && "rounded-br-3xl"}`}>
            <span className="relative flex size-12">
                <p className={`size-16 text-center mt-4`}>{props.provided ? <b>{inputNumber === 0 ? "" : inputNumber} </b> : <> {inputNumber === 0 ? "" : inputNumber}</>}</p>
                {props.shaded &&
                    <span className="ease-in-out animate-ping absolute rounded-sm h-8 w-8 bg-purple-100 opacity-90"></span>
                }
            </span>
        </div>
    );
}
