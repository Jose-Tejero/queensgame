import * as React from 'react';
import { usePositionAndRules } from '../hooks/usePositionAndRules';
import { RowElement } from './RowElement';

export function RenderBoard() {
  const {
    handleQueenRenderedPrincipal,
    handleRemoveQueenPrincipal,
    isRowForbidden,
    isColForbidden,
    isColorForbidden,
    matrix,
    rules,
    initialQueens,
  } = usePositionAndRules();

  return Array.from({ length: matrix }).map((_, index) => (
    <RowElement
      key={index}
      indexRow={index}
      onQueenRenderedPrincipal={handleQueenRenderedPrincipal}
      onRemoveQueenPrincipal={handleRemoveQueenPrincipal}
      numCells={matrix}
      isRowForbidden={isRowForbidden(index + 1)}
      isColForbidden={isColForbidden}
      rules={rules}
      initialQueens={initialQueens}
      isColorForbidden={isColorForbidden}
    />
  ));
}
