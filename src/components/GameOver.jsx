export default function ({ winner, handleClick }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}
      <p>
        <button onClick={handleClick}>Rematch!</button>
      </p>
    </div>
  );
}
