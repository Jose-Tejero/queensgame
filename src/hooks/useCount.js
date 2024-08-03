import { useState } from 'react';

export const useCount = (
  initialState,
  onQueenRendered,
  onRemoveQueen,
  indexCol,
  color
) => {
  const [count, setCount] = useState(initialState);

  const handleClick = () => {
    const newCount = (count + 1) % 3;
    setCount(newCount);
    if (newCount === 2 && onQueenRendered) {
      onQueenRendered(indexCol, color);
    }
    if (newCount === 0 && onRemoveQueen) {
      onRemoveQueen(indexCol, color);
    }
  };

  return { count, handleClick };
};
