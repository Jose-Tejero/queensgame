import './App.css';
import { usePositionAndRules } from './hooks/usePositionAndRules';
import { RenderBoard } from './components/RenderBoard';

function App() {
  const { resetBoard, resetKey } = usePositionAndRules();

  return (
    <>
      <h1>Queen's game</h1>
      <button onClick={resetBoard}>Reset</button>
      <div key={resetKey} className='card'>
        <RenderBoard />
      </div>
    </>
  );
}

export default App;
