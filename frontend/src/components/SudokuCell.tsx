import { useEffect, useState } from "react";

export default function SudokuCell(props: any) {
    const [inputNumber, setInputNumber] = useState(props.initValue);

    // Update local state when props.initValue changes from user input/keypad
    useEffect(() => {
        setInputNumber(props.initValue);
    }, [props.initValue]);

    const handleCellClick = () => {
        props.sudokuCellSelected(props.row, props.col);
    };

    return (
        <div onClick={handleCellClick} className={`outline outline-1 p-1 size-16 
            ${props.shaded ? "bg-purple-100" : "bg-white"} flex items-center hover:bg-slate-200 transition-color duration-150
            ${props.row === 1 && props.col === 1 && "rounded-tl-3xl"}
            ${props.row === 1 && props.col === 9 && "rounded-tr-3xl"}
            ${props.row === 9 && props.col === 1 && "rounded-bl-3xl"}
            ${props.row === 9 && props.col === 9 && "rounded-br-3xl"}`}>
            <span className="relative flex size-12">
                <p className={`size-16 text-center mt-4`}>{inputNumber === 0 ? "" : inputNumber}</p>
                {props.shaded &&
                    <span className="ease-in-out animate-ping absolute rounded-sm h-8 w-8 bg-purple-100 opacity-90"></span>
                }
            </span>
        </div>
    );
}
