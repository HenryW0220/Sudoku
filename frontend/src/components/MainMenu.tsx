import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../keypad.module.css"


export default function MainMenu() {

  const [boards, setBoards] = useState([]);
  const [level, setLevel] = useState('');
  const [testBoards, setTestBoards] = useState([
    [1005, [1, 2, 3], [1, 2, 3], 'Easy'],
    [1006, [4, 5, 6], [4, 5, 6], 'Medium'],
    [1007, [8, 9, 0], [8, 9, 0], 'Hard']
  ]);

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_all_boards')
    .then(res => res.json())
    .then(json => {
      setBoards(json)
      if(boards[0] % 3 === 0){
        setLevel('Hard')
      } else if (boards[0] % 3 === 1){
        setLevel('Easy')
      } else if (boards[0] % 3 === 2){
        setLevel('Medium')
      }
    })
  }, []);

  return <>
    <h1 style={{fontSize: '2.5rem', color: 'white'}}>Welcome!</h1>
    <h1 style={{fontSize: '2rem', color: 'white'}}>Select a Game Board:</h1>
    <div style={{ display: "flex", flexDirection: "row"}}>
        {
          testBoards.map(board => ( 
            // <Link to={`/fullsudokugrid/${board[0]}`}>
              <button className={styles.boardButton}>Board {board[0]} Level: {board[3]}</button>)
            // { </Link>) }
          )
        }
    </div>
  </>
  
}