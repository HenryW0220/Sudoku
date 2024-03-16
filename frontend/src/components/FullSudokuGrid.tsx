import { useState, useEffect } from "react";
//import SingleSudokuBox from "./SingleSudokuBox";

export default function FullSudokuGrid() {
  //
  const [sudokuBoard, setSudokuBoard] = useState([]);
  //let boardID: number = -1;

  //const [sudokuBoard2D, setSudokuBoard2D] = useState([]);
  let board: number[][]
  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_board/1002')//1002 boardID is mock for testing
      .then(res => res.json()).then(json => {
        setSudokuBoard(json.map((element: any) => {
          console.log(element)
          return {  
            value: element,
            shaded: false
          } 
        }))
        
        
        //boardID= sudokuBoard[0]//save the board_id. parse?
        //console.log(json)        //get the 1D array representation of our boards numbers. NOTE: first element is boardID
        
        let count= 1 //used to know what value 
        //save the board content in a 9x9 int array
        for(let i=0; i< 9; i++){
          for(let j=0; j< 9; j++){
            //board[i][j]= sudokuBoard[count]
            //count++
          }
        }
    })
    .catch(error => console.error('Fetch Error:', error))
    // eslint-disable-next-line
  }, []); 

  useEffect(()=> {
    console.log(sudokuBoard)
  } , [sudokuBoard])

  //3x3 small sudoku grid, made to make boarder desing that sudoku has
  //make a 3x3 out of these
  //TODO:
  //use our 2D array of values we fetched and plug them to each individual single boloc
  //map out the single sudoku blocks component and pass on value
  return <div className="grid grid-cols-3 grid-rows-3 outline-1">
            <div className="grid grid-cols-3 grid-rows-3">
            </div>
            <div className="grid grid-cols-3 grid-rows-3">
            </div>
            <div className="grid grid-cols-3 grid-rows-3">   
            </div>
          </div>
}


//Full
  //handles getting from database
  //passes by 
    //top left element: 
      //1, 2, 3
      //10, 11, 12
      //19, 20, 21
    //center left element: 
      //1, 2, 3
      //10, 11, 12
      //19, 20, 21
    
    //top center
      //4, 5, 6
      //13, 14, 15
      //22, 23, 24
    //top right
      //8, 9, 10
      //16, 17, 18
      //31, 32, 33
// 1, 2, 3, 4, 5, 6, 7, 8, 9
//10, 11, 12, 13, 14, 15, 16, 17, 18
//19, 20, 21, 22, 23, 24, 25, 26, 27, 28