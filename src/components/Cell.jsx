import * as React from 'react';
import { useCount } from '../hooks/useCount';
import { RenderIcon } from './RenderIcon';

export function Cell({
  indexCol,
  onQueenRendered,
  onRemoveQueen,
  isRowForbidden,
  isColForbidden,
  isCornerForbidden,
  color,
  inicialState,
  isBlocked,
  isColorForbidden,
}) {
  const { count, handleClick } = useCount(
    inicialState,
    onQueenRendered,
    onRemoveQueen,
    indexCol,
    color
  );

  return (
    <button
      style={{ backgroundColor: color }}
      className='styled-button'
      onClick={handleClick}
      disabled={isBlocked}
    >
      <RenderIcon
        count={count}
        isRowForbidden={isRowForbidden}
        isColForbidden={isColForbidden}
        isCornerForbidden={isCornerForbidden}
        isColorForbidden={isColorForbidden}
      />
    </button>
  );
}
