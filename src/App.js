import "./App.css";
import React, { useState } from "react";
import Todo from "./components/Todo";
import UserData from "./components/UserData";
const axios = require("axios");

function App() {
  const [user, setUser] = useState("");
  const [taskId, setTaskId] = useState(1);
  const [taskTitle, setTaskTitle] = useState("NA");
  const URL = `https://jsonplaceholder.typicode.com/users/${taskId}`;

  const fetchData = async () => {
    const response = await axios.get(URL);
    const data = JSON.stringify(
      [response.data.id, response.data.name, response.data.email],
      null
    );

    setUser(data);
  };

  function getTaskId(item) {
    setTaskId(item);
  }

  function getTaskTitle(item) {
    setTaskTitle(item);
  }

  console.log("task title", taskTitle);
  var array = user.slice(1, -1).split(",");
  return (
    <div className="App">
      <Todo
        taskId={taskId}
        getTaskId={getTaskId.bind(this)}
        getTaskTitle={getTaskTitle.bind(this)}
        fetchData={fetchData}
      />
      <UserData
        array={[...array]}
        fetchData={fetchData}
        taskTitle={taskTitle}
      />
    </div>
  );
}

export default App;
