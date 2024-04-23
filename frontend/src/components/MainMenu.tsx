import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../keypad.module.css"


export default function MainMenu() {

  const [boards, setBoards] = useState([]);
  const [testBoards, setTestBoards] = useState([
    [1005, [1, 2, 3], [1, 2, 3], 'Easy'],
    [1006, [4, 5, 6], [4, 5, 6], 'Medium'],
    [1007, [8, 9, 0], [8, 9, 0], 'Hard'],
    [1008, [1, 3, 5], [2, 4, 6], 'Extreme']
  ]);

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_all_boards')
    .then(res => res.json())
    .then(json => {
      setBoards(json)
    })
  }, []);

  // retrieve all boards IDs
  // get single board with id, send entire single board

  const getBoardLevel = (boardID: number) => {
    switch(boardID % 3){
      case 0:
        return 'Hard';
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      default:
        return '';
    }
  };

  return <>
    <h1 className={"font-bold text-3xl text-neutral-200 p-1"}>Welcome!</h1>
    <h1 className={"font-bold text-3xl text-neutral-200 p-1"}>Start a New Game:</h1>
    <div style={{ display: "flex", flexDirection: "row"}}>
        {
          testBoards.map(board =>
            <Link key={String(board[0])} to={`/fullsudokugrid/${board[0]}`}>
              <button className={styles.boardButton}>
                Board {board[0]} Level: {board[3]}
              </button>
            </Link>
          )
        }
    </div>
  </>
  
}