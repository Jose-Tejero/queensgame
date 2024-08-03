import React from 'react';
import IconChessQueen from '../icons/IconChessQueen';
import IconCross from '../icons/IconCross';

export function RenderIcon({
  count,
  isRowForbidden,
  isColForbidden,
  isCornerForbidden,
  isColorForbidden,
}) {
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
}
