export default function Log({ turns }) {
  const logContent = turns.map(turn => {
    const { square, player} = turn;
    const { row, col } = square
    return <li key={`${row}-${col}`}>{player} selected row: {row}, column: {col}</li>
  });

  return (
    <ol id="log">      
      {logContent}
    </ol>
  )
}