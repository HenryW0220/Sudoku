import { useEffect, useState } from "react";
import styles from "../keypad.module.css"
import FullSudokuGrid from "./FullSudokuGrid";

export default function MainMenu({ userId }: any) {

  const [boardIds, setBoardIds] = useState([]);
  const [partialBoardIds, setPartialBoardIds] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(0);
  const [isPartial, setIsPartial] = useState(false);
  const [startIndex, setStartIndex] = useState(0)
  const [saved, isSaved] = useState(true)
  console.log('userId', userId)
  console.log('part', partialBoardIds)

  console.log('savedMAIN', saved)

  useEffect(() => {
    fetch('http://localhost:5002/boards/retrieve_all_board_ids')
      .then(res => res.json())
      .then(json => {
        setBoardIds(json)
      })
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5002/users/${userId}/partial_boards/retrieve_all_partial_board_ids`)
      .then(res => res.json())
      .then(json => {
        if (json) {
          const ids = json.map((element: any) => element.board_id)
          console.log('id',ids)
          setPartialBoardIds(ids);
          console.log(ids)
        }
      })
      isSaved(false)
  }, [userId, saved, isSaved, selectedBoardId]);


  const getBoardLevel = (boardId: number) => {
    switch (boardId % 3) {
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

  const handleBoardClick = (boardId: number, isPartial: boolean) => {
    setSelectedBoardId(boardId);
    setIsPartial(isPartial);
  };

  const handleNextClick = () => {
    const nextStartIndex = startIndex + 5;
    if (nextStartIndex < boardIds.length) {
      setStartIndex(nextStartIndex);
    }
  };

  const handleBackClick = () => {
    const nextStartIndex = startIndex - 5;
    if (nextStartIndex >= 0) {
      setStartIndex(nextStartIndex);
    }
  }

  return <>
    <h1 className={"font-bold text-3xl text-neutral-200 pb-1"}>Welcome!</h1>
    <h1 className={"font-bold text-3xl text-neutral-200 pb-2"}>Start a New Game:</h1>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button className={styles.arrowButton} onClick={handleBackClick} disabled={startIndex === 0}> <b>{"<"}</b> </button>
      <div style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", padding: "10px" }}>
        {
          boardIds.slice(startIndex, startIndex + 5).map(id =>
            <button className={styles.boardButton} key={id} onClick={() => handleBoardClick(id, false)}>
              <span>Board {id} </span>
              <span>Level: {getBoardLevel(id)}</span>
            </button>
          )
        }
        {partialBoardIds.length > 0 && (
          partialBoardIds.map(id => (
            <button className={styles.boardButton} key={id} onClick={() => handleBoardClick(id, true)}>
              <span>Continue Playing?</span>
              <span>Board {id}</span>
              <span>Level: {getBoardLevel(id)}</span>
            </button>
          ))
        )}
      </div>
      <button className={styles.arrowButton} onClick={handleNextClick} disabled={(startIndex + 5) >= boardIds.length}> <b>{">"}</b> </button>

    </div>
    {
      selectedBoardId !== 0 ? (<FullSudokuGrid boardId={selectedBoardId} resetBoardId={setSelectedBoardId} userId={userId} isPartial={isPartial} saved={saved} isSaved={isSaved} />) : null
    }
  </>
}