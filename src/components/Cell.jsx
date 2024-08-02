import * as React from 'react';
import { useState } from 'react';
import IconChessQueen from '../icons/IconChessQueen';
import IconCross from '../icons/IconCross';

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
  const [count, setCount] = useState(inicialState);

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

  const renderIcon = () => {
    switch (count) {
      case 1:
        return <IconCross />;
      case 2:
        return (
          <IconChessQueen
            style={{
              color:
                isRowForbidden | isColForbidden | isCornerForbidden | isColorForbidden
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
