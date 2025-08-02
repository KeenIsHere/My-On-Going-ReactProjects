import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h1>🔢 React Counter App</h1>
      <div className="counter-box">
        <h2>{count}</h2>
        <div className="btn-group">
          <button className="btn increment" onClick={() => setCount(count + 1)}>
            ➕ Increment
          </button>
          <button
            className="btn decrement"
            onClick={() => setCount(count - 1)}
            disabled={count === 0}
          >
            ➖ Decrement
          </button>
          <button className="btn reset" onClick={() => setCount(0)}>
            🔁 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
