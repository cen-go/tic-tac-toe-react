import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSquareSelect(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      //state mutate etmemek için state'in kopyasını alıyoruz (ÇOK ÖNEMLİ)
      const updatedGameBoard = [ 
        ...prevGameBoard.map((prevRow) => [...prevRow]),
      ];
      updatedGameBoard[rowIndex][colIndex] = "X";
      return updatedGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <button
                key={colIndex}
                onClick={() => handleSquareSelect(rowIndex, colIndex)}
              >
                {playerSymbol}
              </button>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
