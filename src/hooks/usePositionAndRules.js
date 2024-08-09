import { useEffect, useState } from 'react';

export const usePositionAndRules = () => {
  // const initialQueens = [{ indexRow: 1, indexCol: 6 }];
  const initialQueens = [];
  const [rules, setRules] = useState({
    topLeftCornerForbidden: [],
    topRightCornerForbidden: [],
    bottomLeftCornerForbidden: [],
    bottomRightCornerForbidden: [],
    colorForbidden: [],
  });
  const [queenPosition, setQueenPosition] = useState(initialQueens);
  const [polarQueen, setPolarQueen] = useState([]);
  const [matrix, setMatrix] = useState(7);
  const [queenColor, setQueenColor] = useState([]);

  useEffect(() => {
    setRules({
      forbiddenRows: queenPosition.map((pos) => pos.indexRow),
      forbiddenCols: queenPosition.map((pos) => pos.indexCol),
      topLeftCornerForbidden: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow - 1) ** 2 + (pos.indexCol - 1) ** 2) +
          Math.atan(-(pos.indexRow - 1) / (pos.indexCol - 1))
      ),
      topRightCornerForbidden: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow - 1) ** 2 + (pos.indexCol + 1) ** 2) +
          Math.atan(-(pos.indexRow - 1) / (pos.indexCol + 1))
      ),
      bottomLeftCornerForbidden: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow + 1) ** 2 + (pos.indexCol - 1) ** 2) +
          Math.atan(-(pos.indexRow + 1) / (pos.indexCol - 1))
      ),
      bottomRightCornerForbidden: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow + 1) ** 2 + (pos.indexCol + 1) ** 2) +
          Math.atan(-(pos.indexRow + 1) / (pos.indexCol + 1))
      ),
      colorForbidden: queenColor,
    });
  }, [queenPosition]);

  const handleQueenRenderedPrincipal = (indexRow, indexCol, color) => {
    const newPosition = { indexRow: indexRow + 1, indexCol: indexCol + 1 };
    const positionExists = queenPosition.some(
      (pos) =>
        pos.indexRow === newPosition.indexRow &&
        pos.indexCol === newPosition.indexCol
    );

    if (!positionExists) {
      setQueenPosition([...queenPosition, newPosition]);
    } else {
      console.log('Position already exists');
    }

    const newPolarPosition =
      Math.sqrt((indexRow + 1) ** 2 + (indexCol + 1) ** 2) +
      Math.atan(-(indexRow + 1) / (indexCol + 1));
    const positionExistsPolar = polarQueen.some(
      (pos) => pos === newPolarPosition
    );

    if (!positionExistsPolar) {
      setPolarQueen([...polarQueen, newPolarPosition]);
    } else {
      console.log('Position already exists');
    }

    const newColorForbidden = color;

    setQueenColor([...queenColor, newColorForbidden]);
  };

  const handleRemoveQueenPrincipal = (indexRow, indexCol, color) => {
    const updateQueenPositions = queenPosition.filter(
      (pos) => !(pos.indexRow === indexRow + 1 && pos.indexCol === indexCol + 1)
    );
    setQueenPosition(updateQueenPositions);

    const updatePolarQueen = polarQueen.filter(
      (pos) =>
        pos !==
        Math.sqrt((indexRow + 1) ** 2 + (indexCol + 1) ** 2) +
          Math.atan(-(indexRow + 1) / (indexCol + 1))
    );
    setPolarQueen(updatePolarQueen);

    const indexToRemove = queenColor.findIndex((col) => col === color);
    const updateColorQueen =
      indexToRemove !== -1
        ? [
            ...queenColor.slice(0, indexToRemove),
            ...queenColor.slice(indexToRemove + 1),
          ]
        : queenColor;
    setQueenColor(updateColorQueen);
  };

  const isRowForbidden = (indexRow) => {
    const count = rules.forbiddenRows?.filter((row) => row === indexRow).length;
    return count > 1;
  };

  const isColForbidden = (indexCol) => {
    const count = rules.forbiddenCols?.filter((col) => col === indexCol).length;
    return count > 1;
  };

  const isColorForbidden = (color) => {
    const count = rules.colorForbidden?.filter((col) => col === color).length;
    return count > 1;
  };

  return {
    handleQueenRenderedPrincipal,
    handleRemoveQueenPrincipal,
    isRowForbidden,
    isColForbidden,
    isColorForbidden,
    matrix,
    rules,
    initialQueens,
  };
};
