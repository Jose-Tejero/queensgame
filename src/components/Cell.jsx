import * as React from 'react';
import useCount from '../hooks/useCount';
import RenderIcon from './RenderIcon';

function Cell({
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
      {RenderIcon(
        count,
        isRowForbidden,
        isColForbidden,
        isCornerForbidden,
        isColorForbidden
      )}
    </button>
  );
}

export default Cell;
