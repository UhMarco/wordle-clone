import './App.css';
import Board from "./Board";

function App() {
  return (
    <div className="game">
      <div className="heading">
        <h1 className="title">RORDLE</h1>
      </div>
      <Board />
    </div>
  );
}

export default App;
