

export default function GameBoard({ onSelectSquare, board }) {
  // const gameBoard = initialGameBoard;  ****** moved this to App component to check winning conditons

  // updating gameboard array with the data in turns prop with the 
  // help of for of loop. we derived the state from the parent component via props
  // and worked on that state data in child component.

  // *****************************************************************************
  // moved this logic to App componenet to check winning conditions **************
  // for (const turn of turns) {
  //   const { square, player } = turn;  //object destructuring
  //   const { row, col } = square;    //object destructuring
  //   gameBoard[row][col] = player;
  // } ****************************************************************************
  // *****************************************************************************
  
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSquareSelect(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     //state mutate etmemek için state'in kopyasını alıyoruz (ÇOK ÖNEMLİ)
  //     const updatedGameBoard = [ 
  //       ...prevGameBoard.map((prevRow) => [...prevRow]),
  //     ];
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGameBoard;
  //   });

  //   onPlayerSwitch();
  // }

  return (
    <ol id="game-board">
      {board.map((boardRow, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {boardRow.map((playerSymbol, colIndex) => (
              <button
                key={colIndex}
                disabled={playerSymbol !== null}
                onClick={() => onSelectSquare(rowIndex, colIndex)}
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
