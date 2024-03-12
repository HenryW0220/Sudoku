import { useState, useEffect } from "react";


export default function GridBox(props) {

    const [sudokuBoard, setSudokuBoard] = useState([]);
    useEffect(() => {
        //boards id is mock for testing
        fetch('http://localhost:5002/boards/retrieve_board/1002')
            .then(res => res.json()).then(json => {
              setSudokuBoard(json);
              console.log(json);
                //get the 1D array of numbers
                    //save the board_id
                    //save the board content in a 9x9 int array
            })
      }, []);

    //3x3 small sudoku grid, made to make boarder desing that sudoku has
      //make a 3x3 out of these

      //TODO:
      //use our 2D array of values we fetched and plug them to each individual single boloc
      //map out the single sudoku blocks component and pass on value
    return <div class="grid grid-cols-3 grid-rows-3">
                <div class="grid grid-cols-3 grid-rows-3">
                    
                </div>
            </div>
}