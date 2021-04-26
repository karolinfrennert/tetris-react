import { useState, useEffect, useCallback } from "react";

const LINE_POINTS = [40, 100, 300, 1200];

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const calScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + LINE_POINTS[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calScore();
  }, [calScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
