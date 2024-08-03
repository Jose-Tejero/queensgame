import * as React from 'react';
import IconChessQueen from '../icons/IconChessQueen';
import IconCross from '../icons/IconCross';
import useCount from '../hooks/useCount';

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

  const renderIcon = () => {
    switch (count) {
      case 1:
        return <IconCross />;
      case 2:
        return (
          <IconChessQueen
            style={{
              color:
                isRowForbidden |
                isColForbidden |
                isCornerForbidden |
                isColorForbidden
                  ? '#FFA500'
                  : 'white',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <button
      style={{ backgroundColor: color }}
      className='styled-button'
      onClick={handleClick}
      disabled={isBlocked}
    >
      {renderIcon()}
    </button>
  );
}

export default Cell;
