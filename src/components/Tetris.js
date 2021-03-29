import { useState } from "react";
import { createStage } from "../gameHelpers";

//components
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";
//styled components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("Rerendered");
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
