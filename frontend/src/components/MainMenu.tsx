import { useEffect, useState } from "react";
import styles from "../keypad.module.css"
import FullSudokuGrid from "./FullSudokuGrid";

export default function MainMenu() {

  const [boardIds, setBoardIds] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_all_board_ids')
    .then(res => res.json())
    .then(json => {
      setBoardIds(json)
    })
  }, []);

  const getBoardLevel = (boardId: number) => {
    switch(boardId % 3){
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

  const handleBoardClick = (boardId: number) => {
    setSelectedBoardId(boardId);
  };

  return <>
    <h1 className={"font-bold text-3xl text-neutral-200 pb-1"}>Welcome!</h1>
    <h1 className={"font-bold text-3xl text-neutral-200 pb-2"}>Start a New Game:</h1>
    <div style={{ display: "flex", flexDirection: "row"}}>
        {
          boardIds.map(id =>
              <button className={styles.boardButton} key={id} onClick={() => handleBoardClick(id)}>
                <span>Board {id} </span>
                <span>Level: {getBoardLevel(id)}</span>
              </button>
          )
        }
    </div>
    {
      selectedBoardId !== 0 ? (<FullSudokuGrid boardId={selectedBoardId} resetBoardId={setSelectedBoardId} />) : null
    }
  </>
}