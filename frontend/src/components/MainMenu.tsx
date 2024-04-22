import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';

export default function MainMenu() {

  const [boards, setBoards] = useState([]);
  const [testBoards, setTestBoards] = useState([
    [1005, [1, 2, 3], [1, 2, 3]],
    [1006, [4, 5, 6], [4, 5, 6]],
    [1007, [8, 9, 0], [8, 9, 0]]
  ]);
  // const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_all_boards')
    .then(res => res.json())
    .then(json => {
      setBoards(json)
    })
  }, []);

  // const handleClick = () => {
  //   navigate(`http://localhost:5002/boards/retrieve_board/1002`)
  // }

  return <>
    <h1>Welcome!</h1>
    <h1>Select a Game Board:</h1>
    <div style={{ display: "flex", flexDirection: "row" }}>
        {
          testBoards.map(board => ( 
            <button >{board[0]}</button> )
          )
        }
    </div>
  </>
  
}