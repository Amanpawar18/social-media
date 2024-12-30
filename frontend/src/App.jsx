import React, { useState } from "react";
import "./App.css";
import Products from "./Products";

function App() {
  const [a, b] = useState(10);

  return (
    <>
      <div className="w-full h-screen bg-zinc-900- text-white p-5">
        {a}
        <button
          onClick={() => b(a + 20)}
          className="px-3 py-1 bg-green-500 mx-2 rounded-md text-xs"
        >
          Click
        </button>
        <Products age="25" data={{ age: 30, a }} />
      </div>
    </>
  );
}

export default App;
