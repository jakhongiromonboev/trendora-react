import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Hello world</h2>
      <h1 style={{ padding: "20px", background: "gold" }}>Trendora React</h1>
      <div className="card">
        <button
          style={{ padding: "10px", fontSize: "20px", borderRadius: "12px" }}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
