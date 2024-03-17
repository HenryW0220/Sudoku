import { useState, useEffect } from "react";
//import SudokuCell from "./SudokuCell";

//explicitly telling our machine what our sudokuBoard array elements are
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

        //temporary testing 
        let mockList= []
        for(let i=1; i<= 81; i++){
          mockList[i]= i;
        }

        let sudokuElementList: SudokuElement[] = mockList.slice(1, json.length).map((element: any) => {
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



  const [sector1SudokuGrid, setSector1SudokuGrid] = useState<number[]>( [] ) 
  const [sector2SudokuGrid, setSector2SudokuGrid] = useState<number[]>( [] ) 
  const [sector3SudokuGrid, setSector3SudokuGrid] = useState<number[]>( [] ) 
  const [sector4SudokuGrid, setSector4SudokuGrid] = useState<number[]>( [] ) 
  const [sector5SudokuGrid, setSector5SudokuGrid] = useState<number[]>( [] ) 
  const [sector6SudokuGrid, setSector6SudokuGrid] = useState<number[]>( [] ) 
  const [sector7SudokuGrid, setSector7SudokuGrid] = useState<number[]>( [] ) 
  const [sector8SudokuGrid, setSector8SudokuGrid] = useState<number[]>( [] ) 
  const [sector9SudokuGrid, setSector9SudokuGrid] = useState<number[]>( [] ) 


  useEffect(() => {
    if(sudokuBoard.length > 0){      
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

  //testing useEffects
  useEffect(() => {
    console.log(sector1SudokuGrid)
  }, [sector1SudokuGrid]);

  useEffect(() => {
    console.log(sector2SudokuGrid)
  }, [sector2SudokuGrid]);

  useEffect(() => {
    console.log(sector3SudokuGrid)
  }, [sector3SudokuGrid]);

  useEffect(() => {
    console.log(sector4SudokuGrid)
  }, [sector4SudokuGrid]);

  useEffect(() => {
    console.log(sector5SudokuGrid)
  }, [sector5SudokuGrid]);




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

  return <div className="grid grid-cols-3 gap-4">
            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector1SudokuGrid.map((val, index) => <div key={index*1 + "a"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector2SudokuGrid.map((val, index) => <div key={index+ "b"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector3SudokuGrid.map((val, index) => <div key={index+ "c"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector4SudokuGrid.map((val, index) => <div key={index + "d"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector5SudokuGrid.map((val, index) => <div key={index + "e"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector6SudokuGrid.map((val, index) => <div key={index +  "f"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector7SudokuGrid.map((val, index) => <div key={index + "g"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector8SudokuGrid.map((val, index) => <div key={index +  "h"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>

            <div className="grid grid-cols-3 outline-2 gap-4">
              {
                sector9SudokuGrid.map((val, index) => <div key={index +  "i"}>
                  <input value={val} type="button" min="1" max="9"></input>
                </div>)
              }
            </div>
          
                  
        </div>
          
}