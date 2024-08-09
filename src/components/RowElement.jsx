import * as React from 'react';
import { Cell } from './Cell';
import mapa101 from '../maps/mapa101';

export function RowElement({
  numCells,
  indexRow,
  onQueenRenderedPrincipal,
  onRemoveQueenPrincipal,
  isRowForbidden,
  isColForbidden,
  rules,
  initialQueens,
  isColorForbidden,
}) {

  const handleQueenRendered = (indexCol, color) => {
    onQueenRenderedPrincipal(indexRow, indexCol, color);
  };

  const handleRemoveQueen = (indexCol, color) => {
    onRemoveQueenPrincipal(indexRow, indexCol, color);
  };

  const handleSetCornerForbidden = (indexRowPick, indexColPick) => {
    const value =
      Math.sqrt(indexRowPick ** 2 + indexColPick ** 2) +
      Math.atan(-indexRowPick / indexColPick);

    const isForbidden1 = rules.topLeftCornerForbidden?.includes(value);
    const isForbidden2 = rules.topRightCornerForbidden?.includes(value);
    const isForbidden3 = rules.bottomLeftCornerForbidden?.includes(value);
    const isForbidden4 = rules.bottomRightCornerForbidden?.includes(value);

    return isForbidden1 || isForbidden2 || isForbidden3 || isForbidden4;
  };

  const handleQueenInicialState = (posRow, posCol) => {
    const queenExists = initialQueens.some(
      (element) =>
        element.indexRow === posRow + 1 && element.indexCol === posCol + 1
    );

    return queenExists ? 2 : 0;
  };

  return (
    <div className='table-row'>
      {Array.from({ length: numCells }).map((_, index) => (
        <Cell
          key={index}
          indexCol={index}
          onQueenRendered={handleQueenRendered}
          onRemoveQueen={handleRemoveQueen}
          isRowForbidden={isRowForbidden}
          isColForbidden={isColForbidden(index + 1)}
          isCornerForbidden={handleSetCornerForbidden(indexRow + 1, index + 1)}
          color={mapa101[indexRow][index]}
          inicialState={handleQueenInicialState(indexRow, index)}
          isBlocked={handleQueenInicialState(indexRow, index)}
          isColorForbidden={isColorForbidden(mapa101[indexRow][index])}
        />
      ))}
    </div>
  );
}
