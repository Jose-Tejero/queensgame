import './App.css';
import { useEffect, useState } from 'react';
import RowElement from './components/RowElement';

function App() {
  const [count, setCount] = useState(0);
  const [queenPosition, setQueenPosition] = useState([]);
  const [polarQueen, setPolarQueen] = useState([]);
  const [rules, setRules] = useState({
    forbiddenDiagonal1: [],
    forbiddenDiagonal2: [],
    forbiddenDiagonal3: [],
    forbiddenDiagonal4: [],
  });

  useEffect(() => {
    console.log('Hay Queens en:', queenPosition);
    console.log('Hay Queens polarmente en:', polarQueen);

    setRules({
      forbiddenRows: queenPosition.map((pos) => pos.indexRow),
      forbiddenCols: queenPosition.map((pos) => pos.indexCol),
      forbiddenDiagonal1: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow - 1) ** 2 + (pos.indexCol - 1) ** 2) +
          Math.tan(-(pos.indexRow - 1) / (pos.indexCol - 1))
      ),
      forbiddenDiagonal2: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow - 1) ** 2 + (pos.indexCol + 1) ** 2) +
          Math.tan(-(pos.indexRow - 1) / (pos.indexCol + 1))
      ),
      forbiddenDiagonal3: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow + 1) ** 2 + (pos.indexCol - 1) ** 2) +
          Math.tan(-(pos.indexRow + 1) / (pos.indexCol - 1))
      ),
      forbiddenDiagonal4: queenPosition.map(
        (pos) =>
          Math.sqrt((pos.indexRow + 1) ** 2 + (pos.indexCol + 1) ** 2) +
          Math.tan(-(pos.indexRow + 1) / (pos.indexCol + 1))
      ),
    });
  }, [queenPosition]);

  const handleQueenRenderedPrincipal = (indexRow, indexCol) => {
    const newPosition = { indexRow: indexRow + 1, indexCol: indexCol + 1 };
    const positionExists = queenPosition.some(
      (pos) =>
        pos.indexRow === newPosition.indexRow &&
        pos.indexCol === newPosition.indexCol
    );

    if (!positionExists) {
      setQueenPosition([...queenPosition, newPosition]);
    } else {
      console.log('Position already exists');
    }

    const newPolarPosition =
      Math.sqrt((indexRow + 1) ** 2 + (indexCol + 1) ** 2) +
      Math.tan(-(indexRow + 1) / (indexCol + 1));
      console.log('Magnitud:', Math.sqrt((indexRow + 1) ** 2 + (indexCol + 1) ** 2));
      console.log('Angulo:', Math.tan(-(indexRow + 1) / (indexCol + 1)));
    const positionExistsPolar = polarQueen.some(
      (pos) => pos === newPolarPosition
    );

    if (!positionExistsPolar) {
      setPolarQueen([...polarQueen, newPolarPosition]);
    } else {
      console.log('Position already exists');
    }
  };

  const handleRemoveQueenPrincipal = (indexRow, indexCol) => {
    const updateQueenPositions = queenPosition.filter(
      (pos) => !(pos.indexRow === indexRow + 1 && pos.indexCol === indexCol + 1)
    );
    setQueenPosition(updateQueenPositions);

    const updatePolarQueen = polarQueen.filter(
      (pos) =>
        pos !==
        Math.sqrt((indexRow + 1) ** 2 + (indexCol + 1) ** 2) +
          Math.tan(-(indexRow + 1) / (indexCol + 1))
    );
    setPolarQueen(updatePolarQueen);
  };

  const isRowForbidden = (indexRow) => {
    const count = rules.forbiddenRows?.filter((row) => row === indexRow).length;
    return count > 1;
  };

  const isColForbidden = (indexCol) => {
    const count = rules.forbiddenCols?.filter((col) => col === indexCol).length;
    return count > 1;
  };

  return (
    <>
      <h1>Queen's game</h1>
      <h2>Level</h2>
      <button
        onClick={() => setCount((count) => (count > 0 ? count - 1 : 0))}
        disabled={count == 0 ? true : false}
      >
        -
      </button>
      {count}
      <button
        onClick={() => setCount((count) => (count < 4 ? count + 1 : 4))}
        disabled={count == 4 ? true : false}
      >
        +
      </button>
      <div className='card'>
        {Array.from({ length: count + 4 }).map((_, index) => (
          <RowElement
            key={index}
            indexRow={index}
            onQueenRenderedPrincipal={handleQueenRenderedPrincipal}
            onRemoveQueenPrincipal={handleRemoveQueenPrincipal}
            numCells={count + 4}
            isRowForbidden={isRowForbidden(index + 1)}
            isColForbidden={isColForbidden}
            rules={rules}
          />
        ))}
      </div>
    </>
  );
}

export default App;
