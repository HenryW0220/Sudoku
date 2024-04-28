import { useEffect, useState } from "react";
import styles from '../keypad.module.css';

const noteArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function SudokuCell(props: any) {
    // eslint-disable-next-line
    const { col, row, sudokuCellSelected, initValue, shaded, isNote, note, provided } = props;

    const [inputNumber, setInputNumber] = useState(props.initValue);
    const [color, setColor] = useState("");

    // Update local state when props.initValue changes from user input/keypad
    useEffect(() => {
        if (isNote) {
            setInputNumber(provided ? initValue : 0);
        } else {
            setInputNumber(initValue);
        }
    }, [initValue]);

    const handleCellClick = () => {
        props.sudokuCellSelected(row, col);
    };

    useEffect(() => {
        // updates number
        setInputNumber(props.initValue);
        // updates color
        if (props.showingAnswer === true){
            if (props.provided === true){
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
                {
                    isNote ?
                        inputNumber ?
                            <p className={`size-16 text-center mt-4`}>{inputNumber === 0 ? "" : inputNumber}</p> : <div className={styles.sudoCell}>
                                {
                                    noteArr.map((n: number, i: number) => {
                                        return <p style={{
                                            opacity: note.includes(n) ? "1" : "0"
                                        }} className={styles[`note${n}`]} key={i}>{n}</p>
                                    })
                                }
                            </div>
                        :
                        <p className={`size-16 text-center mt-4`}>{inputNumber === 0 ? "" : inputNumber}</p>
                }
                {shaded &&
                    <span className="ease-in-out animate-ping absolute rounded-sm h-8 w-8 bg-purple-100 opacity-90"></span>
                }
            </span>
        </div>
    );
}
