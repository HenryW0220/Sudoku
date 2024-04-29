import { useState, useEffect } from "react";
import SudokuCell from "./SudokuCell";
import styles from '../keypad.module.css'; 
import Note from "./Note";
import Stopwatch from "./StopWatch";

//explicitly telling the machine what our sudokuBoard array elements are
interface SudokuElement {
  value: number;
  ans : number;
  correct : boolean;
  provided: boolean;
  shaded: boolean;
  selected: boolean;
  row: number;
  col: number;
  note: number[];
}

interface FullSudokuGridProps{
  boardId: number;
  resetBoardId: (boardId: number) => void;
}

export default function FullSudokuGrid({boardId, resetBoardId}: FullSudokuGridProps) {
  //contain api sudoku board values
  const [sudokuBoard, setSudokuBoard] = useState<SudokuElement[]>([]) // currently displayed board
  const [tempBoard, setTempBoard] = useState<SudokuElement[]>([]) // temp board for hiding the answer again
  const [selectingListener, setSelectingListener]= useState(false)
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [showNote, SetshowNote] = useState(false);



  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_board/' + boardId , {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let sudokuElementList: SudokuElement[] = json.board_contents.map((element: number, i: number) => {

        const COL: number= (((i +1)%9) ===0) ? 9 : ((i +1)%9)
        const ROW: number= Math.floor(((i/9)+1))
  
        const provided = element !== 0 ? true : false;
        const correct = provided ? true : (element === json.board_answer[i] ? true : false);
  
        let sudokuCellInfo: SudokuElement = {value: element, ans: json.board_answer[i], correct: correct, provided: provided, shaded:false, selected:false, row: ROW, col: COL, note: [] };
        return sudokuCellInfo
      })
      setSudokuBoard( sudokuElementList )  
    })
    .catch(
      error => {
        console.error('Fetch Error:', error)
      } )
  }, []);



  //helper method to set up all sudoku board sectors
  const make9SectorSudokuBox= (rowSector: number, colSector: number) => {
    let inputs: SudokuElement[]= []
    const startIndex: number= ((rowSector*3) *9) + (colSector*3)
    for(let i=0; i < 3 ; i++){
      for(let j=startIndex; j < startIndex +3 ; j++){
        let element: SudokuElement = sudokuBoard[ (i*9) +j ];
        inputs.push( element)
      }
    }
    return inputs
  }


const sudokuCellSelected = (row: number, col: number) => {
  let newSudokuBoard: SudokuElement[] = sudokuBoard.map((cell, index) => {
    // Calculate row and column based on index
    const currentRow = Math.floor(index / 9) + 1;
    const currentCol = index % 9 + 1;

    // Determine if the cell is in the same row, column, or box
    const inSameRow = currentRow === row;
    const inSameCol = currentCol === col;
    const inSameBox = Math.floor((row - 1) / 3) === Math.floor((currentRow - 1) / 3) &&
                      Math.floor((col - 1) / 3) === Math.floor((currentCol - 1) / 3);

    return {
      ...cell,
      shaded: inSameRow || inSameCol || inSameBox,
      selected: currentRow === row && currentCol === col
    };
  });

  setSudokuBoard(newSudokuBoard);
  setSelectingListener(true);
};

const fillSudokuCell = (number: number) => {
  if (!selectingListener) return; // Prevent input if no cell is selected

  let newSudokuBoard: SudokuElement[] = sudokuBoard.map(cell => {
    // Check if the cell is shaded and editable, and if the input number is the same as the cell's current value
    let newCell = { ...cell, shaded: false, selected: false };
    if (cell.selected && !cell.provided) {
      if (cell.value === number) {
        // If the same number is clicked, set value to zero and keep shaded
        newCell = { ...cell, value: 0, shaded: false, selected: false};
      } else {
        // Otherwise, change the value to the new number and remove shading
        newCell =  { ...cell, value: number, shaded: false, selected: false };
      }
    }

    if (cell.selected && showNote) {
      const index = cell.note.indexOf(number);
      if (index !== -1) {
        cell.note.splice(index, 1);
      } else {
        cell.note.push(number)
      }
      newCell =  { ...cell, shaded: false, selected: false,note: cell.note};
    }

    // Unshade all other cells
    return newCell;
  });

  setSudokuBoard(newSudokuBoard);
  setSelectingListener(false); // Reset listener state after input
};

const ansHandler = () => {

  const updatedSudokuElementList = sudokuBoard.map((element) => {
    // If the value is different from the ans, set shaded to true and correct value
    if (element.value !== element.ans) {
      return { ...element, correct: false , value : element.ans};
    }
    else {
      return { ...element, correct: true , value : element.ans};
    }
  });
  if(showingAnswer){
    setSudokuBoard(tempBoard);
    setShowingAnswer(false);
  }
  else {
    setTempBoard(sudokuBoard); // saves current board
    setSudokuBoard(updatedSudokuElementList); // shows ans
    setShowingAnswer(true);
  }
  
}

const eraseHandler = () => {
  setSelectingListener(false)
  setSudokuBoard(sudokuBoard.map((element) => {
    if (element.shaded === true) element.shaded = false
    if (element.selected && showNote) {
      return { ...element, note:[] };
    }
    element.selected=false;
    return element;
  }));
}

  const handleBackClick = () => {
    // Indicates no board has been chosen
    resetBoardId(0);
  }

return <div className={"grid grid-cols-3 items-center"}>
{showNote?
<Note sudokuCellSelected={sudokuCellSelected} makeSectorSudokuBox={make9SectorSudokuBox} sudokuBoard={sudokuBoard} />
:
<div className="grid grid-cols-3 col-span-2 outline outline-4 m-8 rounded-3xl">
  {sudokuBoard.length===81 &&
    <>
      <div className="grid grid-cols-3 outline outline-2 rounded-tl-3xl">
          {
            make9SectorSudokuBox(0,0).map((sudokuElement, index) => <div key={index*1 + "a"}>
            <SudokuCell 
              initValue={sudokuElement.value}
              shaded={sudokuElement.shaded}
              row={sudokuElement.row}
              col={sudokuElement.col}
              provided={sudokuElement.provided}
              correct={sudokuElement.correct}
              showingAnswer={showingAnswer}
              sudokuCellSelected={sudokuCellSelected}></SudokuCell>
          </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2">
          {
            make9SectorSudokuBox(0,1).map((sudokuElement, index) => <div key={index*1 + "a"}>
            <SudokuCell 
              initValue={sudokuElement.value}
              shaded={sudokuElement.shaded}
              row={sudokuElement.row}
              col={sudokuElement.col}
              provided={sudokuElement.provided}
              correct={sudokuElement.correct}
              showingAnswer={showingAnswer}
              sudokuCellSelected={sudokuCellSelected}></SudokuCell>
          </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2 rounded-tr-3xl">
          {
            make9SectorSudokuBox(0,2).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
            </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2">
          {
            make9SectorSudokuBox(1,0).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
            </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2">
          {
            make9SectorSudokuBox(1,1).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
            </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2">
          {
            make9SectorSudokuBox(1,2).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
            </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2 rounded-bl-3xl">
          {
            make9SectorSudokuBox(2,0).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
            </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2">
          {
            make9SectorSudokuBox(2,1).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
            </div>)
          }
        </div>
        <div className="grid grid-cols-3 outline outline-2 rounded-br-3xl">
          {
            make9SectorSudokuBox(2,2).map((sudokuElement, index) => <div key={index*1 + "a"}>
              <SudokuCell 
                initValue={sudokuElement.value}
                shaded={sudokuElement.shaded}
                row={sudokuElement.row}
                col={sudokuElement.col}
                provided={sudokuElement.provided}
                correct={sudokuElement.correct}
                showingAnswer={showingAnswer}
                sudokuCellSelected={sudokuCellSelected}></SudokuCell>
              </div>)
          }
        </div>
    </>
  }
</div>}
<div>
  <div>
    <Stopwatch/>
  </div>
  <div className={"col-span-1"}>
    <div className={styles.keypadContainer}>
        <div className={styles.modeContainer}>
          <div className={styles.modeLabel}>Mode:</div>
          <div className={styles.modeSection}>
              <button className={styles.modeButton} onClick={() => SetshowNote(false)}>NORMAL</button>
              <button className={styles.modeButton} onClick={() => SetshowNote(true)}>NOTES</button>
          </div>
        </div>

        <div className={styles.numbersSection}>
          {Array.from({ length: 9 }, (_, i) => (
            <button onClick={() => fillSudokuCell(i + 1)} key={i} className={styles.numberButton}>{i + 1}</button>
          ))}
        </div>

        <div className={styles.actionsSection}>
            {!showNote && <button className={styles.actionButton}>UNDO</button>}
            <button className={styles.actionButton} onClick={eraseHandler}>ERASE</button>
            {!showNote && <button className={styles.actionButton} onClick={ansHandler}>ANSWER</button>}
        </div>
      </div>
      <div className={styles.quitButton}>
              <button onClick={handleBackClick}>QUIT</button>
      </div>
    </div>
  </div>
</div>
  
}