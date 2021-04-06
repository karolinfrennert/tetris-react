import { useState, useCallback } from "react";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";
import { randomTetromino, TETROMINOS } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );

    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonePlayer = JSON.parse(JSON.stringify(player));
    clonePlayer.tetromino = rotate(clonePlayer.tetromino, dir);
    const pos = clonePlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonePlayer, stage, { x: 0, y: 0 })) {
      clonePlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonePlayer.tetromino[0].length) {
        rotate(clonePlayer.tetromino, -dir);
        clonePlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonePlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return { player, updatePlayerPos, resetPlayer, playerRotate };
};
