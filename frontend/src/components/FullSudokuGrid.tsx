import { useState, useEffect } from "react";
import SudokuCell from "./SudokuCell";
import styles from '../keypad.module.css'; 
import { useNavigate, useParams } from "react-router-dom";

//explicitly telling the machine what our sudokuBoard array elements are
interface SudokuElement {
  value: number;
  shaded: boolean;
  selected: boolean;
  row: number;
  col: number;
}
export default function FullSudokuGrid() {
  //contain api sudoku board values
  const [sudokuBoard, setSudokuBoard] = useState<SudokuElement[]>([])

  const [selectingListener, setSelectingListener]= useState(false)

  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();

/**
  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_board/1002')//1002 boardID is mock for testing
      .then(res => res.json()).then(json => {
        let sudokuElementList: number[] = json.slice(1).map((element: number) => {
          return element
        })
        setSudokuBoard( sudokuElementList )  
      })
    .catch(
      error => {
        console.error('Fetch Error:', error)
      } )
    // eslint-disable-next-line
  }, []);
  */

 //TODO: test version
  useEffect(() => {
    let json: number[]= [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9] 
    let sudokuElementList: SudokuElement[] = json.map((element: number, i) => {

      const COL: number= (((i +1)%9) ===0) ? 9 : ((i +1)%9)
      const ROW: number= Math.floor(((i/9)+1))

      let sudokuCellInfo: SudokuElement = {value: element , shaded:false, selected:false, row: ROW, col: COL};
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


const sudokuCellSelected= (row:number, col:number) => {
  if(selectingListener) return

  let newSudokuBoard: SudokuElement[]= [...sudokuBoard]

  newSudokuBoard[(row-1)*9 + (col)].selected= true
  setSelectingListener(true)


  //shading row
  for(let i= (row-1)*9 ; i<row*9 ; i++){
    newSudokuBoard[i].shaded= true
  }

  //shading col
  for(let i= col-1 ; i<81 ; i+=9){
    newSudokuBoard[i].shaded= true
  }

  //shading box
  const rowSector= Math.floor((row-1)/3)
  const colSector= Math.floor((col-1)/3)
  const startIndex: number= ((rowSector*3) *9) + (colSector*3)
    for(let i=0; i < 3 ; i++){
      for(let j=startIndex; j < startIndex +3 ; j++){
        newSudokuBoard[ (i*9) +j ].shaded=true
      }
    }

  setSudokuBoard(newSudokuBoard)
}


const fillSudokuCell= () => {
  setSelectingListener(false)
  let newSudokuBoard: SudokuElement[]= [...sudokuBoard]
  newSudokuBoard= newSudokuBoard.map(element => {
    if(element.shaded===true) element.shaded= false
    return element
  })
  console.log(newSudokuBoard)
  setSudokuBoard(sudokuBoard)
}

const handleBackClick = () => {
  navigate('/mainmenu')
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
                <button onClick={fillSudokuCell} key={i} className={styles.numberButton}>{i + 1}</button>
              ))}
            </div>

            <div className={styles.actionsSection}>
              <button className={styles.actionButton}>UNDO</button>
              <button className={styles.actionButton}>ERASE</button>
            </div>
          </div>
          <div className={styles.mainMenuButton}>
            <button onClick={handleBackClick}>Back to Main Menu</button>
          </div>
    </div>
  </div>
  
}