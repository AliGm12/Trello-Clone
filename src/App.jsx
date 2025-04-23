import React from "react";
import Board from "./components/Trello Components/Board";
import BoardHeader from "./components/Trello Components/BoardHeader";

function App() {
  return (
    <div className="h-screen bg-pink-700 ">
      <BoardHeader />
      <Board />
    </div>
  );
}

export default App;