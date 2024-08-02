import * as React from 'react';
import Cell from './Cell';
import { useState, useEffect } from 'react';

function RowElement({
  numCells,
  indexRow,
  onQueenRenderedPrincipal,
  onRemoveQueenPrincipal,
  isRowForbidden,
  isColForbidden,
  rules,
}) {
  const colorMatrix = [
    ['#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#8B0000'],
    ['#2F4F4F', '#556B2F', '#556B2F', '#556B2F', '#8B4513', '#8B0000', '#8B0000', '#8B0000'],
    ['#2F4F4F', '#556B2F', '#242424', '#242424', '#8B4513', '#483D8B', '#483D8B', '#483D8B'],
    ['#2F4F4F', '#556B2F', '#242424', '#242424', '#8B4513', '#8B4513', '#8B4513', '#483D8B'],
    ['#2F4F4F', '#4B0082', '#242424', '#242424', '#242424', '#242424', '#006400', '#483D8B'],
    ['#2F4F4F', '#4B0082', '#242424', '#242424', '#242424', '#242424', '#006400', '#2F4F4F'],
    ['#2F4F4F', '#4B0082', '#4B0082', '#4B0082', '#006400', '#006400', '#006400', '#2F4F4F'],
    ['#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F', '#2F4F4F']
  ];
  
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
          color={colorMatrix[indexRow][index]}
        />
      ))}
    </div>
  );
}

export default RowElement;
