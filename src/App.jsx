import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningCombinations";

const INITIAL_PLAYER_NAMES = { X: "Player 1", O: "Player 2" };

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

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn; //object destructuring
    const { row, col } = square; //object destructuring
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
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
      winner = players[firstSquare];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYER_NAMES);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  // we removed activePlayer state and compute activePlayer from the data
  // we are managing in gameTurns state
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);  
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

  function handleRestart() {
    setGameTurns([]);
  }

  function HandlePlayerNameChange(symbol, newPlayerName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newPlayerName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={INITIAL_PLAYER_NAMES.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={HandlePlayerNameChange}
          />
          <Player
            name={INITIAL_PLAYER_NAMES.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={HandlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver handleClick={handleRestart} winner={winner} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
