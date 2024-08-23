
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  const gameBoard = initialGameBoard;
  // updating gameboard array with the data in turns prop with the 
  // help of for of loop. we derived the state from the parent component via props
  // and worked on that state data in child component.
  for (const turn of turns) {
    const { square, player } = turn;  //object destructuring
    const { row, col } = square;    //object destructuring
    gameBoard[row][col] = player;
  }
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
      {gameBoard.map((boardRow, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {boardRow.map((playerSymbol, colIndex) => (
              <button
                key={colIndex}
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
