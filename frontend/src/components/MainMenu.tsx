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

  const getBoardLevelDetails = (boardId: number): { color: string, text: string } => {
    switch (boardId % 3) {
      case 0:
        return { color: 'bg-red-500', text: 'Hard' };
      case 1:
        return { color: 'bg-green-500', text: 'Easy' };
      case 2:
        return { color: 'bg-yellow-500', text: 'Medium' };
      default:
        return { color: '', text: '' };
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
          boardIds.slice(startIndex, startIndex + 5).map(id => {
            const { color, text } = getBoardLevelDetails(id);
            return (
              <button
                key={id}
                className={`flex flex-col justify-center items-center p-4 text-white ${color} hover:bg-opacity-75 font-semibold mx-1 rounded w-36 h-24`} 
                onClick={() => handleBoardClick(id)}
              >
                <span>Board {id} </span>
                <span>Level: {text}</span>
              </button>
            );
          })
        }
      </div>
      <button className={styles.arrowButton} onClick={handleNextClick} disabled={(startIndex + 5) >= boardIds.length}> <b>{">"}</b> </button>
    </div>

    {
      selectedBoardId !== 0 ? (<FullSudokuGrid boardId={selectedBoardId} resetBoardId={setSelectedBoardId} />) : null
    }
  </>
}