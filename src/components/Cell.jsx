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
}) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount = (count + 1) % 3;
    setCount(newCount);
    if (newCount === 2 && onQueenRendered) {
      onQueenRendered(indexCol);
    }
    if (newCount === 0 && onRemoveQueen) {
      onRemoveQueen(indexCol);
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
              color: isRowForbidden | isColForbidden | isCornerForbidden ? 'red' : 'white',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <button className='styled-button' onClick={handleClick}>
      {renderIcon()}
    </button>
  );
}

export default Cell;
