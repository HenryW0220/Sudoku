import { useState, useEffect } from "react";
import SudokuCell from "./SudokuCell";

//explicitly telling the machine what our sudokuBoard array elements are
interface SudokuElement {
  value: number;
  shaded: boolean;
}

export default function FullSudokuGrid() {

  //contain the information needed to know what to display to our sudoku cells
  // eslint-disable-next-line
  const [sudokuBoard, setSudokuBoard] = useState<SudokuElement[]>( [] ); 


  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_board/1002')//1002 boardID is mock for testing
      .then(res => res.json()).then(json => {

        let sudokuElementList: SudokuElement[] = json.slice(1).map((element: any) => {
          return {
            value: element,
            shaded: false
          }
        })
        setSudokuBoard( sudokuElementList )  

      })
    .catch(
      error => {
        console.error('Fetch Error:', error)
      } )
    // eslint-disable-next-line
  }, []);



  //setting up our nine 9x9 sudoku sectors
  //reason for this implementation is to have outline design you'd see in sudoku board
  const [sector1SudokuGrid, setSector1SudokuGrid] = useState<number[]>( [] ) 
  const [sector2SudokuGrid, setSector2SudokuGrid] = useState<number[]>( [] ) 
  const [sector3SudokuGrid, setSector3SudokuGrid] = useState<number[]>( [] ) 
  const [sector4SudokuGrid, setSector4SudokuGrid] = useState<number[]>( [] ) 
  const [sector5SudokuGrid, setSector5SudokuGrid] = useState<number[]>( [] ) 
  const [sector6SudokuGrid, setSector6SudokuGrid] = useState<number[]>( [] ) 
  const [sector7SudokuGrid, setSector7SudokuGrid] = useState<number[]>( [] ) 
  const [sector8SudokuGrid, setSector8SudokuGrid] = useState<number[]>( [] ) 
  const [sector9SudokuGrid, setSector9SudokuGrid] = useState<number[]>( [] ) 


  //once we fetch api data, we fill in our sudoku Board sectors
  useEffect(() => {
    if(sudokuBoard.length === 81){      
      setSector1SudokuGrid( make9SectorSudokuBox(0,0))
      setSector2SudokuGrid( make9SectorSudokuBox(0,1))
      setSector3SudokuGrid( make9SectorSudokuBox(0,2))
      setSector4SudokuGrid( make9SectorSudokuBox(1,0))
      setSector5SudokuGrid( make9SectorSudokuBox(1,1))         
      setSector6SudokuGrid( make9SectorSudokuBox(1,2))
      setSector7SudokuGrid( make9SectorSudokuBox(2,0))
      setSector8SudokuGrid( make9SectorSudokuBox(2,1))
      setSector9SudokuGrid( make9SectorSudokuBox(2,2))
    }
  }, [sudokuBoard]);


  //helper method to set up all sudoku board sectors
  const make9SectorSudokuBox= (rowSector: number, colSector: number) => {
    let inputs: number[]= []

    const startIndex: number= (rowSector*3) + ((colSector*3) *9)

    for(let i=0; i < 3 ; i++){
      for(let j=startIndex; j < startIndex +3 ; j++){
        console.log("i= " + i+ " j= " +j + " value: " +  sudokuBoard[ (i*9) +j ].value) 
        console.log("index: " + (i*9) +j)

        inputs.push(sudokuBoard[ (i*9) +j ].value)
      }
    }
    return inputs
  }



  return <div className="grid grid-cols-3 outline outline-4 m-8 rounded-xl">
            
            <div className="grid grid-cols-3 outline outline-2 rounded-tl-lg">
              {
                sector1SudokuGrid.map((val, index) => <div key={index*1 + "a"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2">
              {
                sector4SudokuGrid.map((val, index) => <div key={index+ "b"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2 rounded-tr-lg">
              {
                sector7SudokuGrid.map((val, index) => <div key={index+ "c"}>
                  <SudokuCell initValue={val}></SudokuCell>                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2">
              {
                sector2SudokuGrid.map((val, index) => <div key={index + "d"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2">
              {
                sector5SudokuGrid.map((val, index) => <div key={index + "e"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2">
              {
                sector8SudokuGrid.map((val, index) => <div key={index +  "f"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2 rounded-bl-lg">
              {
                sector3SudokuGrid.map((val, index) => <div key={index + "g"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2">
              {
                sector6SudokuGrid.map((val, index) => <div key={index +  "h"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline outline-2 rounded-br-lg">
              {
                sector9SudokuGrid.map((val, index) => <div key={index +  "i"}>
                  <SudokuCell initValue={val}></SudokuCell>
                </div>)
              }
            </div>
                  
        </div>          
}

 