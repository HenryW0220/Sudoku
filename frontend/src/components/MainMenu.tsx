import { useEffect, useState } from "react";
import styles from "../keypad.module.css"
import FullSudokuGrid from "./FullSudokuGrid";

export default function MainMenu() {

  const [boardIds, setBoardIds] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(0);
  const [startIndex, setStartIndex] = useState(0)

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

  const handleNextClick = () => {
    const nextStartIndex = startIndex + 5;
    if(nextStartIndex < boardIds.length){
      setStartIndex(nextStartIndex);
    }
  };

  const handleBackClick = () => {
    const nextStartIndex = startIndex - 5;
    if(nextStartIndex >= 0){
      setStartIndex(nextStartIndex);
    }
  }

  return <>
    <h1 className={"font-bold text-3xl text-neutral-200 pb-1"}>Welcome!</h1>
    <h1 className={"font-bold text-3xl text-neutral-200 pb-2"}>Start a New Game:</h1>
    <div style={{ display: "flex", flexDirection: "row"}}>
      <button className={styles.arrowButton} onClick={handleBackClick} disabled={startIndex === 0}> <b>{"<"}</b> </button>
      <div style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", padding: "10px" }}>
        {
          boardIds.slice(startIndex, startIndex + 5).map(id =>
              <button className={styles.boardButton} key={id} onClick={() => handleBoardClick(id)}>
                <span>Board {id} </span>
                <span>Level: {getBoardLevel(id)}</span>
              </button>
          )
        }
      </div>
      <button className={styles.arrowButton} onClick={handleNextClick} disabled={(startIndex + 5) >= boardIds.length}> <b>{">"}</b> </button>
    </div>

    {
      selectedBoardId !== 0 ? (<FullSudokuGrid boardId={selectedBoardId} resetBoardId={setSelectedBoardId} />) : null
    }
  </>
}