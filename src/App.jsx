import './App.css';
import { RowElement } from './components/RowElement';
import { usePositionAndRules } from './hooks/usePositionAndRules';

function App() {

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

  return (
    <>
      <h1>Queen's game</h1>
      <button onClick={() => console.log('Resetear tablero de mentirita')}>
        Reset
      </button>
      <div className='card'>
        {Array.from({ length: matrix }).map((_, index) => (
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
        ))}
      </div>
    </>
  );
}

export default App;
