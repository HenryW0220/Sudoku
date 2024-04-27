import { useState, useEffect } from "react";
import SudokuCell from "./SudokuCell";
import styles from '../keypad.module.css'; 

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
}
export default function FullSudokuGrid() {
  //contain api sudoku board values
  const [sudokuBoard, setSudokuBoard] = useState<SudokuElement[]>([]) // currently displayed board
  const [tempBoard, setTempBoard] = useState<SudokuElement[]>([]) // temp board for hiding the answer again
  const [selectingListener, setSelectingListener]= useState(false)
  const [showingAnswer, setShowingAnswer] = useState(false)
  const [boardId, setBoardId] = useState<number>(3); // defaulted to 1 for now


  // useEffect(() => {
  //   fetch(`http://localhost:5002/boards/retrieve_board/${boardId}`)//1002 boardID is mock for testing
  //     .then(res => res.json())
  //     .then(json => {
  //       json.board_id;
  //       json.board_contents;
  //       json.board_answer;

  //       //(userid,boardid, partialboardcontents, boardanswer) for partial
  //       // let sudokuElementList: SudokuElement[] = json.slice(0).map((element: number, i) => {

  //       //   const COL: number= (((i +1)%9) ===0) ? 9 : ((i +1)%9)
  //       //   const ROW: number= Math.floor(((i/9)+1))
    
  //       //   let sudokuCellInfo: SudokuElement = {value: element, ans: json.slice(1)[i], shaded:false, selected:false, row: ROW, col: COL};
  //       //   return sudokuCellInfo
  //       // })
  //       // setSudokuBoard( sudokuElementList )
  //       console.log(json)
  //       console.log(json.slice(0));
  //       console.log(json.slice(1));
  //     })
  //   .catch(
  //     error => {
  //       console.error('Fetch Error:', error)
  //     } )
  //   // eslint-disable-next-line
  // }, []);


 //TODO: test version
  useEffect(() => {
    let json: number[]= [4,0,7,2,1,6,0,9,3,0,3,0,4,5,0,6,7,0,0,0,9,3,0,7,4,0,0,1,0,8,0,6,4,0,3,0,9,7,6,0,0,0,0,2,4,3,0,5,0,7,0,9,6,1,8,9,2,0,0,3,0,5,0,5,0,3,7,0,8,0,4,0,7,6,0,5,0,1,3,8,0] 
    let ansList: number[]=[4,8,7,2,1,6,5,9,3,2,3,1,4,5,9,6,7,8,6,5,9,3,8,7,4,1,2,1,2,8,9,6,4,7,3,5,9,7,6,1,3,5,8,2,4,3,4,5,8,7,2,9,6,1,8,9,2,6,4,3,1,5,7,5,1,3,7,9,8,2,4,6,7,6,4,5,2,1,3,8,9]
    let sudokuElementList: SudokuElement[] = json.map((element: number, i) => {

      const COL: number= (((i +1)%9) ===0) ? 9 : ((i +1)%9)
      const ROW: number= Math.floor(((i/9)+1))

      const provided = element != 0 ? true : false;
      const correct = provided ? true : (element == ansList[i] ? true : false);

      let sudokuCellInfo: SudokuElement = {value: element, ans: ansList[i], correct: correct, provided: provided, shaded:false, selected:false, row: ROW, col: COL};
      return sudokuCellInfo
    })
    setSudokuBoard( sudokuElementList )  
    // eslint-disable-next-line
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
    if (cell.selected && !cell.provided) {
      if (cell.value === number) {
        // If the same number is clicked, set value to zero and keep shaded
        return { ...cell, value: 0, shaded: false, selected: false};
      } else {
        // Otherwise, change the value to the new number and remove shading
        return { ...cell, value: number, shaded: false, selected: false };
      }
    }
    // Unshade all other cells
    return { ...cell, shaded: false, selected: false };
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
    return element;
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


  return <div className={"grid grid-cols-3 items-center"}>
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
    </div>

    <div className={"col-span-1"}>
      <div className={styles.keypadContainer}>
            <div className={styles.modeContainer}>
              <div className={styles.modeLabel}>Mode:</div>
              <div className={styles.modeSection}>
                <button className={styles.modeButton}>NORMAL</button>
                <button className={styles.modeButton}>NOTES</button>
              </div>
            </div>

            <div className={styles.numbersSection}>
              {Array.from({ length: 9 }, (_, i) => (
                 <button onClick={() => fillSudokuCell(i + 1)} key={i} className={styles.numberButton}>{i + 1}</button>
              ))}
            </div>

            <div className={styles.actionsSection}>
              <button className={styles.actionButton}>UNDO</button>
              <button className={styles.actionButton}>ERASE</button>
              <button className={styles.actionButton} onClick={ansHandler}>ANSWER</button>
            </div>
          </div>
    </div>
  </div>
  
}