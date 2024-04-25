import { useState, useEffect } from "react";
import SudokuCell from "./SudokuCell";

//explicitly telling the machine what our sudokuBoard array elements are
interface SudokuElement {
    value: number;
    provided: boolean;
    shaded: boolean;
    selected: boolean;
    row: number;
    col: number;
    note: number[];
}
interface Props {
    sudokuBoard: SudokuElement[];
    sudokuCellSelected: Function;
    makeSectorSudokuBox: (row: number, col: number) => SudokuElement[];
}
export default function Note(Props: Props) {

    const { sudokuBoard, sudokuCellSelected, makeSectorSudokuBox } = Props;

    return <div className="grid grid-cols-3 col-span-2 outline outline-4 m-8 rounded-3xl">
        {sudokuBoard.length === 81 &&
            <>
                <div className="grid grid-cols-3 outline outline-2 rounded-tl-3xl">
                    {
                        makeSectorSudokuBox(0, 0).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2">
                    {
                        makeSectorSudokuBox(0, 1).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2 rounded-tr-3xl">
                    {
                        makeSectorSudokuBox(0, 2).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2">
                    {
                        makeSectorSudokuBox(1, 0).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2">
                    {
                        makeSectorSudokuBox(1, 1).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2">
                    {
                        makeSectorSudokuBox(1, 2).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2 rounded-bl-3xl">
                    {
                        makeSectorSudokuBox(2, 0).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2">
                    {
                        makeSectorSudokuBox(2, 1).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
                <div className="grid grid-cols-3 outline outline-2 rounded-br-3xl">
                    {
                        makeSectorSudokuBox(2, 2).map((sudokuElement, index) => <div key={index * 1 + "a"}>
                            <SudokuCell
                                initValue={sudokuElement.value}
                                shaded={sudokuElement.shaded}
                                row={sudokuElement.row}
                                col={sudokuElement.col}
                                note={sudokuElement.note}
                                provided={sudokuElement.provided}
                                isNote={true}
                                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
                        </div>)
                    }
                </div>
            </>
        }
    </div>

}