import "./App.css";
import React from "react";
import Todo from "./components/Todo";
import UserData from "./components/UserData";

function App() {
  return (
    <div className="App">
      <Todo />
      <UserData />
    </div>
  );
}

export default App;
