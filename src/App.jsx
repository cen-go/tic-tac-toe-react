import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningCombinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  // we removed activePlayer state and compute activePlayer from the data
  // we are managing in gameTurns state
  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;  //object destructuring
    const { row, col } = square;    //object destructuring
    gameBoard[row][col] = player;
  }


  let winner;  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&      
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
    }    
  }
  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curentActivePlayer) =>
    //   curentActivePlayer === "X" ? "O" : "X"
    // );

    setGameTurns((prevTurns) => {
      // if we use activePlayer state we will be merging two states that's
      //unwanted and don't always guarantee that we're getting the latest data
      //instead we calculated active player data with the below if statement.

      // let currentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      // we can compute currentPlayer with the same function we used to compute 
      // activePlayer but we pass Prevturns instead as argument 
      const currentPlayer = deriveActivePlayer(prevTurns);

      // we add the object that holds the data about the latest turn at the
      //beginning of the gameTurns array of objects
      // we use a function with prevTurns to not mutate the previous state.
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">          
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />          
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
