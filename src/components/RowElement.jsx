import * as React from 'react';
import Cell from './Cell';
import { useState, useEffect } from 'react';
import mapa93 from '../maps/mapa93';
import mapa94 from '../maps/mapa94';

function RowElement({
  numCells,
  indexRow,
  onQueenRenderedPrincipal,
  onRemoveQueenPrincipal,
  isRowForbidden,
  isColForbidden,
  rules,
}) {
  
  useEffect(() => {
    console.log('Rules changed');
  }, [rules]);

  const handleQueenRendered = (indexCol) => {
    onQueenRenderedPrincipal(indexRow, indexCol);
  };

  const handleRemoveQueen = (indexCol) => {
    onRemoveQueenPrincipal(indexRow, indexCol);
  };

  const handleSetCornerForbidden = (indexRowPick, indexColPick) => {
    const value =
      Math.sqrt(indexRowPick ** 2 + indexColPick ** 2) +
      Math.tan(-indexRowPick / indexColPick);

    const isForbidden1 = rules.forbiddenDiagonal1?.includes(value);
    const isForbidden2 = rules.forbiddenDiagonal2?.includes(value);
    const isForbidden3 = rules.forbiddenDiagonal3?.includes(value);
    const isForbidden4 = rules.forbiddenDiagonal4?.includes(value);

    return isForbidden1 || isForbidden2 || isForbidden3 || isForbidden4;
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
          color={mapa94[indexRow][index]}
        />
      ))}
    </div>
  );
}

export default RowElement;
