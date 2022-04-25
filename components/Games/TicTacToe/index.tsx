/* eslint-disable security/detect-object-injection */
import Button from "@components/Button";
import PageTitle from "@components/PageTitle";
import { SyntheticEvent, useState } from "react";
import styles from "./TicTacToe.module.css";

export default function TicTacToe() {
  const size = 3;
  const [winner, setWinner] = useState<null | string>(null);
  const [tiles, setTiles] = useState<string[]>(Array(size * size).fill(null));
  const [player, setPlayer] = useState<string>("X");

  function checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      }
    }

    return null;
  }

  function handleClick(event: SyntheticEvent) {
    const target = event.target as HTMLButtonElement;
    tiles[Number(target.value)] = player;
    target.innerText = player;
    setTiles(tiles);
    const winner = checkWinner();
    if (winner !== null) {
      setWinner(player);

      return;
    }
    setPlayer(player === "X" ? "O" : "X");
  }

  function handleNewGame() {
    setTiles(Array(size * size).fill(null));
    setPlayer("X");
    setWinner(null);
  }

  return (
    <div className="text-center">
      <PageTitle>Tic-tac-toe</PageTitle>
      {winner ? <p className="font-bold">The winner is {winner}!</p> : <p>Next player: {player}</p>}
      <div className={styles.board}>
        {tiles.map((tile, i) => (
          <button
            onClick={handleClick}
            className={styles.tile}
            key={i}
            value={i}
            disabled={Boolean(winner) || tiles[i] !== null}
          >
            {tiles[i]}
          </button>
        ))}
      </div>
      <Button className="mt-10" onClick={handleNewGame}>
        New game
      </Button>
    </div>
  );
}
