import { useState, useEffect } from "react";


export default function FullSudokuGrid() {
  //
  const [sudokuBoard, setSudokuBoard] = useState([]);

  let boardID: number = -1;

  let board: number[][]

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_board/1002')//1002 boardID is mock for testing
      .then(res => res.json()).then(json => {
        setSudokuBoard(json);//get the 1D array representation of our boards numbers. NOTE: first element is boardID
          boardID= sudokuBoard[0]//save the board_id. parse?
          console.log(json)

          let count= 1 //used to know what value 
          //save the board content in a 9x9 int array
          for(let i=0; i< 9; i++){
            for(let j=0; j< 9; j++){
              board[i][j]= sudokuBoard[count]
              count++
            }
        }          
      })
  }, []);

    //3x3 small sudoku grid, made to make boarder desing that sudoku has
      //make a 3x3 out of these

      //TODO:
      //use our 2D array of values we fetched and plug them to each individual single boloc
      //map out the single sudoku blocks component and pass on value
    return <div className="grid grid-cols-3 grid-rows-3 outline-1">
                <div className="grid grid-cols-3 grid-rows-3">
                    
                </div>
            </div>
}