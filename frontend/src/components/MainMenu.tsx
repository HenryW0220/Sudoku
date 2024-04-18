import React, { useEffect, useState } from "react";

export default function MainMenu() {

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_all_boards')
    .then(res => res.json())
    .then(json => {
      setBoards(json)
    })
  }, []);

  return <>
    <h1>Welcome!</h1>
    <h1>Select a Game Board:</h1>
    {
      boards.map(board => {
        return board
      })
    }
  </>
  
}