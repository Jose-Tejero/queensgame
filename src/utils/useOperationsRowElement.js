export const useOperationsRowElement = () => {
  const handleQueenInitialState = (posRow, posCol, initialQueens) => {
    const queenExists = initialQueens.some(
      (element) =>
        element.indexRow === posRow + 1 && element.indexCol === posCol + 1
    );

    return queenExists ? 2 : 0;
  };

  return { handleQueenInitialState };
};
